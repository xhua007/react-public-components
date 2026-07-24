import { useState, type CSSProperties, type ReactNode } from 'react';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '../src/icons';
import './index.less';

export type CollapseBoxDirection = 'horizontal' | 'vertical';
export type CollapseBoxButtonPosition = 'left' | 'right' | 'top' | 'bottom';

export interface CollapseBoxProps {
  children?: ReactNode;
  title?: string;
  direction?: CollapseBoxDirection;
  buttonPosition?: CollapseBoxButtonPosition;
  defaultWidth?: number | string;
  defaultHeight?: number | string;
  contentPadding?: string;
  headerHeight?: number;
}

const isNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value);

const formatDimension = (value?: number | string): string | undefined => {
  if (value === undefined || value === null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

const ChevronLeft = () => <LeftOutlined />;

const ChevronRight = () => <RightOutlined />;

const ChevronUp = () => <UpOutlined />;

const ChevronDown = () => <DownOutlined />;

const CollapsibleBox = ({
  children,
  title = '内容区域',
  direction = 'horizontal',
  buttonPosition = 'right',
  defaultWidth = 600,
  defaultHeight = 300,
  contentPadding = '16px',
  headerHeight = 16,
}: CollapseBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getContentMaxHeight = () => {
    if (typeof defaultHeight === 'number') {
      return `${defaultHeight - headerHeight}px`;
    }
    if (typeof defaultHeight === 'string') {
      return headerHeight ? `calc(${defaultHeight} - ${headerHeight}px)` : defaultHeight;
    }
    return '100%';
  };

  const getIcon = () => {
    if (direction === 'horizontal') {
      if (buttonPosition === 'right') {
        return isExpanded ? <ChevronRight /> : <ChevronLeft />;
      } else {
        return isExpanded ? <ChevronLeft /> : <ChevronRight />;
      }
    } else {
      if (buttonPosition === 'bottom') {
        return isExpanded ? <ChevronUp /> : <ChevronDown />;
      } else {
        return isExpanded ? <ChevronDown /> : <ChevronUp />;
      }
    }
  };

  const getButtonClass = () => {
    if (direction === 'horizontal') {
      return buttonPosition === 'right' ? 'button-right' : 'button-left';
    } else {
      return buttonPosition === 'bottom' ? 'button-bottom' : 'button-top';
    }
  };

  const getContainerStyle = (): CSSProperties => {
    const resolvedHeight = formatDimension(defaultHeight);
    const resolvedWidth = formatDimension(defaultWidth);
    if (direction === 'horizontal') {
      return {
        width: isExpanded ? resolvedWidth : '0px',
        height: resolvedHeight,
        minWidth: 0,
      };
    } else {
      return {
        height: isExpanded ? resolvedHeight : '0px',
        width: resolvedWidth,
        minHeight: 0,
      };
    }
  };

  const wrapperClass =
    direction === 'horizontal' ? 'collapsible-wrapper horizontal' : 'collapsible-wrapper vertical';

  const containerClass =
    direction === 'horizontal' && buttonPosition === 'right'
      ? 'collapsible-container align-right'
      : 'collapsible-container';
  const height = getContentMaxHeight();
  const contentStyle: CSSProperties = {
    maxHeight: direction === 'vertical' ? (isExpanded ? height : '0px') : height,
    overflowY: 'auto',
    padding: direction === 'vertical' && !isExpanded ? '0px' : contentPadding,
    boxSizing: 'border-box',
  };

  // 折叠时（纵向 + 底部按钮）：按钮需切换为 top:0 定位，使其显示在折叠线下方
  const buttonStyle: CSSProperties =
    direction === 'vertical' && buttonPosition === 'bottom' && !isExpanded
      ? { top: '0px', bottom: 'auto' }
      : {};

  // 让 wrapper 高度跟随容器，确保 bottom:0 的按钮贴住容器底部
  // 折叠时 wrapper 高度为 0，配合按钮的 translateY(-100%) 让按钮显示在折叠线上方
  const formattedWidth = formatDimension(defaultWidth);
  const formattedHeight = formatDimension(defaultHeight);
  const wrapperStyle: CSSProperties | undefined =
    direction === 'vertical'
      ? isExpanded
        ? {
            height: formattedHeight,
            width: formattedWidth,
          }
        : { height: 0, width: formattedWidth }
      : undefined;

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <div style={getContainerStyle()} className={containerClass}>
        {title && (
          <div className="collapsible-header" style={{ display: 'none' }}>
            <h3>{title}</h3>
          </div>
        )}

        <div className="collapsible-content" style={contentStyle}>
          {children}
        </div>
      </div>

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`toggle-button ${getButtonClass()}`}
        style={buttonStyle}
        title={isExpanded ? '隐藏' : '展开'}
      >
        {getIcon()}
      </div>
    </div>
  );
};

export default CollapsibleBox;
