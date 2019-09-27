import { propEq, prop } from "ramda";

export const WHAT = {
    call: 'call',
    forward: 'forward',
    meet: 'meet',
    none: 'none',
};

const whatEq = what => propEq('what', what);

export const isTodo = comment => prop('what')(comment);
export const isTodoCall = whatEq(WHAT.call);
export const isTodoForward = whatEq(WHAT.forward);
export const isTodoMeet = whatEq(WHAT.meet);
export const isTodoNone = whatEq(WHAT.none);