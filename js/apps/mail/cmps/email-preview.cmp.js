// import bookAppCmp from '../pages/book-app.cmp';

export default {
  props: ['email'],
  template: `
<div>
  
 <td >{{email.to}}</td>
   <td>
        <p >
          <strong>{{email.subject}} - {{email.body}}</strong>
        </p>
  </td>
      <td class="date" >
      {{formatDate(email)}}
     </td>
     <td><button @click.stop="onToggleRead(email)">{{isRead}}</button></td>  
     <td><button @click.stop="onToggleStar(email)" :class="{star: isActive}">Star</button></td>  
     <td><button @click.stop="onRemove(email.id)">Delete</button></td>  
</div> 
                 
    `,
  data() {
    return {
      isActive: this.email.isStar
    };
  },
  methods: {
    formatDate(email) {
      return email.sentAt;
    },
    onRemove(emailId) {
      this.$emit('remove', emailId);
    },
    onToggleRead(email){
      this.$emit('toggle',email);
    },
    onToggleStar(email){
      this.isActive = !this.isActive;
      this.$emit('stared',email);
    },
  },
  computed: {
    isRead(){
      return this.email.isRead ? 'unRead':'Read';
    }
  }
};
