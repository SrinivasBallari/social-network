const {Post} = require('../models/index');
const CrudRepo = require('./crud-repo');

class PostRepo extends CrudRepo{

    constructor(){
        super(Post);
    }

} 

module.exports = PostRepo;