'use strict';

interface CardAttract {
  init: any;
  magnitude: number;
  card: any;
  shimmer: any;
  mposit: number[];
  getElems: any;
  handleMouseMove: any;
  renderAttract: any;
  reqRAFLoop: any;
  cardAttract: object;
}

const cardAttract: CardAttract = {
  init(this: any) {
    if (document.getElementById('mecard')! && document.getElementById('shimmer')!) {
      console.log('go');
      this.getElems();
      this.reqRAFLoop();
      console.log('done');
    }
  },
  mposit: [0, 0],
  magnitude: -2,
  getElems(this: any) {
    try {
      this.card = document.getElementById('mecard');
      this.shimmer = document.getElementById('shimmer');
      return true;
    } catch {
      return false;
    }
  },
  card: null,
  shimmer: null,
  handleMouseMove(this: any) {
    return (event: MouseEvent) => {
      this.mposit[0] = event.pageX - 500;
      this.mposit[1] = event.pageY - 500;
      return true;
    };
  },
  renderAttract(this: any) {
    // Set new positions
    this.card.style.transform = `
      rotateX(${this.mposit[1] * 0.01 * this.magnitude}deg)
      rotateY(${this.mposit[0] * -0.01 * this.magnitude}deg)
    `;
    this.shimmer.style.transform = `
      translateZ(0px)
      translateY(${this.mposit[1] * 0.1 - 100}px)
      translateX(${this.mposit[0] * 0.1}px)
    `;
    // Call loop again
    this.reqRAFLoop();
    return true;
  },
  reqRAFLoop(this: any) {
    this.getElems();
    try {
        window.requestAnimationFrame(() => {
          this.renderAttract();
        });
    } catch {
      return false;
    }
  },
  cardAttract(this: any) {
    return (positionData: number[]) => {
      this.reqRAFLoop();
    };
  },
};

document.onmousemove = cardAttract.handleMouseMove();

export default cardAttract;
