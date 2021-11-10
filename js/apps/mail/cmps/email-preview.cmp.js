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
    <td><button @click.stop="onRemove(email.id)">Delete</button></td>  
</div> 
                 
    `,
  data() {
    return {};
  },
  methods: {
    formatDate(email) {
      return email.sentAt;
    },
    onRemove(emailId) {
      this.$emit('remove', emailId);
    },
  },
};
