

export default {
    template: `
        <div class="note-filter">
            <input v-model="filterBy.byName" @change="filter" type="text" placeholder="Search">
            <input name="byTxt" type="checkbox" @click="filter" v-model="filterBy.byType.txt">
            <label for="byTxt">Text</label><br>
            <input name="byVideo" type="checkbox" @click="filter" v-model="filterBy.byType.video">
            <label for="byVideo">Video</label><br>
            <input name="byImg" type="checkbox" @click="filter" v-model="filterBy.byType.img">
            <label for="byImg">Text</label><br>
            <input name="byTodo" type="checkbox" @click="filter" v-model="filterBy.byType.todo">
            <label for="byTodo">ToDos</label><br>
        </div>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                byType: {
                    txt: false,
                    video: false,
                    img: false,
                    todo: false,
                }
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', JSON.parse(JSON.stringify(this.filterBy)))
        }
    }
}