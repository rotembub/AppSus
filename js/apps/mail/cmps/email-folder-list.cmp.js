export default {
    template: `
          <div class="folder-filter">
            <button @click="compose">Compose</button>
            <button @click="showBy('inbox')">Inbox</button>
            <button @click="showBy('sent')">Sent</button>
            <button @click="showBy('star')">Stared</button>
            <button @click="showBy('trash')">Trash</button>
            <button @click="showBy('draft')">Draft</button>
          </div>
      `,
    data() {
      return {
      
      };
    },
    methods: {
      filter() {
        this.$emit('filtered', {...this.filterBy});
        //deep copy
        // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
      },
      onSort() {
        this.$emit('sorted', this.sort);
      },
      showBy(folder){
          this.$emit('show',folder);
      },
      compose(){
        this.$emit('composed');
    }
    },
  };
  