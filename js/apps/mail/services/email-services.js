import {utilService} from '../../../services/util-service.js';
import {storageService} from '../../../services/async-storage-service.js';
import {emailsDB} from './emails-db.js';

const EMAILS_KEY = 'emails';
let demoData = emailsDB.emailsData();
console.log(demoData);
const gEmails = _createEmails();
// const KEY_API_BOOKS = 'apiBooks'

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus'
 }
 

export const emailService = {
  query,
  getById,
  save,
  remove,
  toggleRead,
  addEmail,
  getEmailsByFolder
  // saveReview,
  // createReviews,
  // removeReview,
  // apiBooks,
  // addGoogleBook,
  // getNextBookId,
  // getPrevtBookId
};

function query() {
  return storageService.query(EMAILS_KEY);
}

function getById(emailId) {
  return storageService.get(EMAILS_KEY, emailId);
}


function save(email) {
  if (email.id) return storageService.put(EMAILS_KEY, email);
  else return storageService.post(EMAILS_KEY, email);
}

function addEmail(email) {
  const formatEmail = {
    id: utilService.makeId(),
    subject: email.subject,
    body:  email.body,
    isRead: false,
    sentAt: Date.now(),
    to: 'user@appsus.com'
  };
  return storageService.post(EMAILS_KEY, formatEmail);
}

function remove(emailId) {
   return storageService.remove(EMAILS_KEY,emailId);
}

function toggleRead(email) {
  email.isRead = !email.isRead;
  return storageService.put(EMAILS_KEY, email);
}

function getEmailsByFolder(folder){
  if(folder === 'sent'){
    return query().then( emails=> {
      return emails.filter(e => e.to === loggedinUser.email);
    })
  }
  if(folder === 'inbox') return query().then(emails => emails.filter(e => e.to !== loggedinUser.email));

}

//reviews logic 
// function saveReview(book,review) {
//     book.reviews.push(review);
//     return storageService.put(EMAILS_KEY, book);
// }

// function removeReview(book,reviewId){
//   const idx = book.reviews.findIndex(r => r.id === reviewId);
//   book.reviews.splice(idx,1);
//   return storageService.put(EMAILS_KEY, book);
// }

// function createReviews(book) {
//   book.reviews = [];
//   storageService.put(EMAILS_KEY, book);
// }


function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY);
  if (!emails || !emails.length) {
    emails = demoData;
    console.log(demoData);
    utilService.saveToStorage(EMAILS_KEY, emails);
  }
  console.log(emails);
  return emails;
}

//add book logic , api call
// function apiBooks(bookName){
//   const apiBooks = utilService.loadFromStorage(KEY_API_BOOKS) || null;
//   if(apiBooks){
//     //return one promise do the logic here axios or local
//     console.log('from storage');
//     console.log(apiBooks);
//     return Promise.resolve(apiBooks);
//   }
//    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`)
//           .then((res) => {
//             utilService.saveToStorage(KEY_API_BOOKS,res.data);
//              return res.data // save the data in local storage
//           });
// }

// function addGoogleBook(googleBook){
//    const bookConvert = {
//      id: googleBook.id,
//      title: googleBook.volumeInfo.title,
//      authors: [googleBook.volumeInfo.authors[0]],
//      listPrice: {
//       amount: 109,
//       currencyCode: 'EUR',
//       isOnSale: false,
//      },
//      pageCount: googleBook.volumeInfo.pageCount || 100,
//      description: googleBook.volumeInfo.description || 'no Description',
//      thumbnail: googleBook.volumeInfo.imageLinks.smallThumbnail,
//      publishedDate: googleBook.volumeInfo.publishedDate
//    };
//     return storageService.post(EMAILS_KEY, bookConvert);
// }

// function getNextBookId(bookId){
//   return query().then(books => {
//     const idx = books.findIndex(book => book.id === bookId);
//     return (idx === books.length-1) ? books[0].id : books[idx+1].id;
//   })
// }

// function getPrevtBookId(bookId){
//   return query().then(books => {
//     const idx = books.findIndex(book => book.id === bookId);
//     return (idx === 0) ? books[books.length-1].id : books[idx-1].id;
//   })
// }