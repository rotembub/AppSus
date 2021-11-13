export default {
  props:['isShow'],
    template: `
          <div  class="folder-filter">
            <div  :class="{showbar: isShow}" class="mail-folder-nav">
              <span @click="showBy('inbox')">Inbox</span>
              <span @click="showBy('sent')">Sent</span>
              <span @click="showBy('star')">Stared</span>
              <span @click="showBy('trash')">Trash</span>
              <span @click="showBy('draft')">Draft</span>
            </div>
          </div>
      `,
    data() {
      return {
      
      };
    },
    methods: {
      filter() {
        this.$emit('filtered', {...this.filterBy});
      },
      onSort() {
        this.$emit('sorted', this.sort);
      },
      showBy(folder){
          this.$emit('show',folder);
          this.$emit('hideTask');
      },
      compose(){
        this.$emit('composed');
    }
    },
  };
  