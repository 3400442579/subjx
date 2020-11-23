import Helper from './Helper';
import drag from './transform';

export default class Subjx extends Helper {

    drag() {
        return drag.call(this, ...arguments);
    }

}