import emailPreview from './email-preview.cmp.js';

export default {
  props: ['emails'],
  template: `

        <table class="mail-table">
            <tbody>
                <tr v-for="email in emails" :key="email.id" :class="['clickable', email.isRead ? 'read' : '']">
                  <email-preview :email="email"  @click.native="select(email)" @remove="onRemove(email)"></email-preview>
                </tr>
            </tbody>
        </table>
                <!-- <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
              <div class="item-content">
                <book-preview :book="book" @click.native="select(book)" />
               
                    <router-link :to="'/book/'+book.id" >Details</router-link> 
                
                </div>
            </li>
        </ul> -->
    `,
  methods: {
    
    select(email) {
      this.$emit('selected', email);
    },
    log() {
      console.log('Logging.....');
    },
    onRemove(email) {
      this.$emit('remove',email);
    },
  },
  components: {
    emailPreview,
  },
};
