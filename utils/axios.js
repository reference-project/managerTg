import axios from 'axios'
const Axios =axios.create({
   baseURL:'localhost:8080',
   timeout:1000,
   headers: {'X-Requested-With': 'XMLHttpRequest'}
})
export default Axios