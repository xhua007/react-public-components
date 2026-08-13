export interface HsbColor {
	h: number; // 0 ~ 360
	s: number; // 0 ~ 100
	b: number; // 0 ~ 100
	a: number; // 0 ~ 1
}

export interface RgbColor {
	r: number; // 0 ~ 255
	g: number; // 0 ~ 255
	b: number; // 0 ~ 255
	a: number; // 0 ~ 1
}

export interface ColorGradientStop {
	color: Color;
	percent: number; // 0 ~ 100
}

export type ColorInput =
	| string
	| Color
	| { r: number; g: number; b: number; a?: number }
	| { h: number; s: number; b: number; a?: number };

export const parseGradientStops = (gradientStr: string): ColorGradientStop[] => {
	let clean = gradientStr.trim();
	if (clean.toLowerCase().startsWith('linear-gradient')) {
		const match = clean.match(/linear-gradient\([^,]+,\s*(.+)\)$/i);
		if (match) {
			clean = match[1];
		}
	}

	// 匹配颜色 + 百分比，例如 "rgb(16,142,233) 0%, rgb(135,208,104) 100%"
	// 或 "#1677ff 0%, #36cfc9 100%"
	const parts = clean.split(/,\s*(?=[a-zA-Z#])/);
	const stops: ColorGradientStop[] = [];

	parts.forEach((part, index) => {
		const percentMatch = part.match(/\s+(\d+(?:\.\d+)?)%\s*$/);
		let percent = index === 0 ? 0 : 100;
		let colorStr = part;

		if (percentMatch) {
			percent = parseFloat(percentMatch[1]);
			colorStr = part.replace(/\s+\d+(?:\.\d+)?%\s*$/, '').trim();
		}

		stops.push({
			color: generateColor(colorStr),
			percent,
		});
	});

	if (stops.length === 0) {
		return [
			{ color: generateColor('rgb(16,142,233)'), percent: 0 },
			{ color: generateColor('rgb(135,208,104)'), percent: 100 },
		];
	}

	return stops;
};

export const formatGradientCss = (stops: ColorGradientStop[]): string => {
	const sorted = [...stops].sort((a, b) => a.percent - b.percent);
	return `linear-gradient(90deg, ${sorted.map((s) => `${s.color.toCssString()} ${s.percent}%`).join(', ')})`;
};

export const formatGradientText = (stops: ColorGradientStop[]): string => {
	const sorted = [...stops].sort((a, b) => a.percent - b.percent);
	return sorted.map((s) => `${s.color.toCssString()} ${s.percent}%`).join(', ');
};

export class Color {
	h: number = 0; // 0 ~ 360
	s: number = 0; // 0 ~ 100
	b: number = 0; // 0 ~ 100
	a: number = 1; // 0 ~ 1

	constructor(colorInput?: ColorInput) {
		if (!colorInput) {
			this.h = 215;
			this.s = 91;
			this.b = 100;
			this.a = 1;
			return;
		}

		if (colorInput instanceof Color) {
			this.h = colorInput.h;
			this.s = colorInput.s;
			this.b = colorInput.b;
			this.a = colorInput.a;
			return;
		}

		if (typeof colorInput === 'string') {
			const parsed = Color.parseString(colorInput);
			this.h = parsed.h;
			this.s = parsed.s;
			this.b = parsed.b;
			this.a = parsed.a;
			return;
		}

		if (typeof colorInput === 'object') {
			if ('r' in colorInput && 'g' in colorInput && 'b' in colorInput) {
				const hsb = Color.rgbToHsb(colorInput.r, colorInput.g, colorInput.b, colorInput.a ?? 1);
				this.h = hsb.h;
				this.s = hsb.s;
				this.b = hsb.b;
				this.a = hsb.a;
			} else if ('h' in colorInput && 's' in colorInput && 'b' in colorInput) {
				this.h = Math.min(360, Math.max(0, colorInput.h));
				this.s = Math.min(100, Math.max(0, colorInput.s));
				this.b = Math.min(100, Math.max(0, colorInput.b));
				this.a = Math.min(1, Math.max(0, colorInput.a ?? 1));
			}
		}
	}

	static rgbToHsb(r: number, g: number, b: number, a: number = 1): HsbColor {
		const rNorm = r / 255;
		const gNorm = g / 255;
		const bNorm = b / 255;

		const max = Math.max(rNorm, gNorm, bNorm);
		const min = Math.min(rNorm, gNorm, bNorm);
		const delta = max - min;

		let h = 0;
		if (delta !== 0) {
			if (max === rNorm) {
				h = ((gNorm - bNorm) / delta) % 6;
			} else if (max === gNorm) {
				h = (bNorm - rNorm) / delta + 2;
			} else {
				h = (rNorm - gNorm) / delta + 4;
			}
			h = Math.round(h * 60);
			if (h < 0) h += 360;
		}

		const s = max === 0 ? 0 : Math.round((delta / max) * 100);
		const v = Math.round(max * 100);

		return { h, s, b: v, a };
	}

	static hsbToRgb(h: number, s: number, b: number, a: number = 1): RgbColor {
		const sNorm = s / 100;
		const vNorm = b / 100;

		const c = vNorm * sNorm;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = vNorm - c;

		let rPrime = 0;
		let gPrime = 0;
		let bPrime = 0;

		if (h >= 0 && h < 60) {
			rPrime = c;
			gPrime = x;
			bPrime = 0;
		} else if (h >= 60 && h < 120) {
			rPrime = x;
			gPrime = c;
			bPrime = 0;
		} else if (h >= 120 && h < 180) {
			rPrime = 0;
			gPrime = c;
			bPrime = x;
		} else if (h >= 180 && h < 240) {
			rPrime = 0;
			gPrime = x;
			bPrime = c;
		} else if (h >= 240 && h < 300) {
			rPrime = x;
			gPrime = 0;
			bPrime = c;
		} else if (h >= 300 && h <= 360) {
			rPrime = c;
			gPrime = 0;
			bPrime = x;
		}

		const r = Math.round((rPrime + m) * 255);
		const g = Math.round((gPrime + m) * 255);
		const bRes = Math.round((bPrime + m) * 255);

		return { r, g, b: bRes, a };
	}

	static parseString(str: string): HsbColor {
		const trimmed = str.trim().toLowerCase();

		// 解析 hex，例如 #1677ff, #fff, #1677ff80
		if (trimmed.startsWith('#')) {
			let hex = trimmed.slice(1);
			if (hex.length === 3) {
				hex = hex
					.split('')
					.map((c) => c + c)
					.join('');
			}
			if (hex.length === 6) {
				const r = parseInt(hex.slice(0, 2), 16);
				const g = parseInt(hex.slice(2, 4), 16);
				const b = parseInt(hex.slice(4, 6), 16);
				return Color.rgbToHsb(r, g, b, 1);
			}
			if (hex.length === 8) {
				const r = parseInt(hex.slice(0, 2), 16);
				const g = parseInt(hex.slice(2, 4), 16);
				const b = parseInt(hex.slice(4, 6), 16);
				const a = parseInt(hex.slice(6, 8), 16) / 255;
				return Color.rgbToHsb(r, g, b, a);
			}
		}

		// 解析 rgb / rgba
		const rgbMatch = trimmed.match(
			/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/,
		);
		if (rgbMatch) {
			const r = parseInt(rgbMatch[1], 10);
			const g = parseInt(rgbMatch[2], 10);
			const b = parseInt(rgbMatch[3], 10);
			const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1;
			return Color.rgbToHsb(r, g, b, a);
		}

		// 解析 hsb / hsba / hsl / hsla
		const hsbMatch = trimmed.match(
			/^hsba?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?(?:\s*,\s*([\d.]+))?\s*\)$/,
		);
		if (hsbMatch) {
			const h = parseInt(hsbMatch[1], 10);
			const s = parseInt(hsbMatch[2], 10);
			const b = parseInt(hsbMatch[3], 10);
			const a = hsbMatch[4] !== undefined ? parseFloat(hsbMatch[4]) : 1;
			return { h, s, b, a };
		}

		// 默认 fallback (蓝)
		return { h: 215, s: 91, b: 100, a: 1 };
	}

	toRgb(): RgbColor {
		return Color.hsbToRgb(this.h, this.s, this.b, this.a);
	}

	toRgbString(): string {
		const { r, g, b, a } = this.toRgb();
		if (a < 1) {
			return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(2))})`;
		}
		return `rgb(${r}, ${g}, ${b})`;
	}

	toHsb(): HsbColor {
		return {
			h: Math.round(this.h),
			s: Math.round(this.s),
			b: Math.round(this.b),
			a: Number(this.a.toFixed(2)),
		};
	}

	toHsbString(): string {
		const { h, s, b, a } = this.toHsb();
		if (a < 1) {
			return `hsba(${h}, ${s}%, ${b}%, ${a})`;
		}
		return `hsb(${h}, ${s}%, ${b}%)`;
	}

	toHex(): string {
		const { r, g, b } = this.toRgb();
		const rHex = r.toString(16).padStart(2, '0');
		const gHex = g.toString(16).padStart(2, '0');
		const bHex = b.toString(16).padStart(2, '0');
		return `${rHex}${gHex}${bHex}`;
	}

	toHexString(): string {
		return `#${this.toHex()}`;
	}

	toCssString(): string {
		if (this.a < 1) {
			return this.toRgbString();
		}
		return this.toHexString();
	}
}

export const generateColor = (color: ColorInput): Color => {
	if (color instanceof Color) {
		return color;
	}
	return new Color(color);
};
