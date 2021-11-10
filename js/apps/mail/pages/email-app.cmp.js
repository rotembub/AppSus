import {emailService} from '../services/email-services.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailDetails from './email-details.cmp.js';
import composeEmail from '../cmps/compose-email.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js';
// import bookAdd from '../cmps/book-add.cmp.js'
// import carEdit from './car-edit.cmp.js';

export default {
  template: `
        <section class="book-app">
           <h3> unRead count: {{unReadCount}}</h3>
            <email-filter @sorted="sortEmails" @filtered="setFilter" />
            <!-- <book-add @addedBook="refBooks"/> -->
            <email-list :emails="emailsToShow" @selected="selectEmail" @remove="onRemove" />
            <email-details v-if="selectedEmail" :email="selectedEmail" @close="closeDetails" />
            <compose-email/>
            <email-folder-list @show="onShowFolder"/>
        </section>
    `,
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: null,
    };
  },
  created() {
    this.loadEmails();
  },
  methods: {
    loadEmails() {
      emailService.query().then((emails) => {
          this.emails = emails.filter(e=> e.to !== 'user@appsus.com')
        });
    },
    selectEmail(email) {
      console.log('yes');
      console.log(email);
      emailService.toggleRead(email).then(this.selectedEmail = email);
      this.$router.push('/email/'+email.id); 
    },
    closeDetails() {
      this.selectedBook = null;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    refBooks(newBooks){
      this.emails = newBooks;
    },
    onRemove(email) {
      emailService.remove(email.id).then(emails => this.emails = emails);
    },
    sortEmails(sortBy){
        if(sortBy === 'date'){
            return this.emails.sort((e1,e2) => e2.sentAt - e1.sentAt);
        } else
        return this.emails.sort((e1,e2) => e1.subject.toLowerCase() > e2.subject.toLowerCase() ? 1 : -1);
    },
    onShowFolder(folder){
        emailService.getEmailsByFolder(folder).then(emails => this.emails = emails);
    }
  },
  computed: {
    emailsToShow() {
      if (!this.filterBy) return this.emails;
      const searchStr = this.filterBy.title.toLowerCase();
      if(this.filterBy.read === 'all'&& !searchStr) return this.emails;
      const byRead = this.filterBy.read === 'read' ? true : false;
      // const searchPrice = this.filterBy.price ? this.filterBy.price : Infinity;
      //TODO: need to fix search with all
      const emailsToShow = this.emails.filter((email) => {
        return (
          email.subject.toLowerCase().includes(searchStr) && email.isRead === byRead
          // book.listPrice.amount <= searchPrice
        );
      });
      return emailsToShow;
    },
    unReadCount() {
        let count = 0;
        if(!this.emails) return;
        this.emails.filter((e) => {
          if (!e.isRead) {
            count++;
          }
        });
        return count;
      },
  },
  components: {
    emailList,
    emailFilter,
    emailDetails,
    composeEmail,
    emailFolderList
    // bookAdd
    // carEdit,
  },
};
