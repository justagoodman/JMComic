import React, {Component} from 'react';
import Canvas from 'react-native-canvas';
class JMImage extends Component {
  handleCanvas = (canvas: Canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  };
  render(): JSX.Element {
    return <Canvas ref={this.handleCanvas} />;
  }
}

export default JMImage;