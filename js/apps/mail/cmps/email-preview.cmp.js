
export default {
  props: ['email'],
  template: `
<div class="email-preview">
  
 <td class="to-td">{{email.to}}</td>
   <td>
        <p >
          <strong>{{email.subject}} - {{email.body}}</strong>
        </p>
  </td>
      <td class="date" >
        <div class="date-format-email">
        <span>
      {{formatDate(email)}}
        </span>
        </div>
      
     </td>
    
      <td><span @click.stop="onToggleRead(email)"><i  class="far fa-envelope" v-if="!email.isRead"></i><i class="far fa-envelope-open" v-if="email.isRead"></i></span></td>  
      <td><span @click.stop="onToggleStar(email)" :class="{star: isActive}"><i class="fas fa-star"></i></span></td>  
      <td><span @click.stop="onRemove(email.id)"><i class="fas fa-trash"></i></span></td> 
      <td><router-link :to="'/note/'+email.id"><i class="far fa-clipboard"></i></router-link></td>
    
   </div> 
                 
    `,
  data() {
    return {
      isActive: this.email.isStar
    };
  },
  methods: {
    formatDate(email) {
      // var day =new Date(email.sentAt).getDate();
      // var month=new Date(email.sentAt).getMonth()+1;
      // var year=new Date(email.sentAt).getFullYear();
      // var original_date= day +'/'+month+'/'+year;
      let date = new Date(email.sentAt).toLocaleString().replace(/\s/g, "");

      return  date; //original_date;
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
