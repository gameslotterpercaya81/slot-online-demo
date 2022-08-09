'use babel';

import SlotOnlineDemoView from './slot-online-demo-view';
import { CompositeDisposable } from 'atom';

export default {

  slotOnlineDemoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotOnlineDemoView = new SlotOnlineDemoView(state.slotOnlineDemoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotOnlineDemoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-online-demo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotOnlineDemoView.destroy();
  },

  serialize() {
    return {
      slotOnlineDemoViewState: this.slotOnlineDemoView.serialize()
    };
  },

  toggle() {
    console.log('SlotOnlineDemo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
