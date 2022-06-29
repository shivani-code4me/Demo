import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:3006/",
})
// it gets a bit tedious to keep writing that baseURL for every single request. Couldn't you just have Axios remember
//  what baseURL you're using, 
// since it always involves a similar endpoint?
// In fact, you can. If you create an instance with the .create() method, Axios will remember that baseURL,
//  plus other values you might want to specify for every request, including headers

//The .create() function returns a newly created instance, which in this case is called client.
//Async-await allows you to write much cleaner code without then and catch callback functions. 
// Making it async allows you to use the await keword to resolve the GET request and set that data in state on the next
//  line without the .then() callback.