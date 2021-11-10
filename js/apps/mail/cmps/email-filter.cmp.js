export default {
  template: `
        <div class="book-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            <label> Read/UnRead</label>
            <select @change="filter" v-model="filterBy.read">
              <option value="read">Read</option>
              <option value="unRead">UnRead</option>
              <option value="all">All</option>
            </select>
          <label>Sort</label>
          <select @change="onSort" v-model="sort">
              <option value="date">date</option>
              <option value="subject">subject</option>
            </select>
        </div>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        read: '',
      },
      sort: ''
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
  },
};
