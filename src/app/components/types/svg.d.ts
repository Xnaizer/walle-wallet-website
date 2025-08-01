declare module '*.svg' {
  import * as React from 'react';
  
  interface SVGProps extends React.SVGProps<SVGSVGElement> {
    title?: string;
    className?: string;
    style?: React.CSSProperties;
  }
  
  const ReactComponent: React.FC<SVGProps>;
  export default ReactComponent;
}