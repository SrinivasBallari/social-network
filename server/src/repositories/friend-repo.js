const { FriendRequest } = require('../models/index');
const CrudRepo = require("./crud-repo");

class FriendRepo extends CrudRepo{

    constructor(){
        super(FriendRequest);
    }

}

module.exports = FriendRepo;