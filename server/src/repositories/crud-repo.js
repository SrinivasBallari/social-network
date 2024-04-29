class CrudRepository {
    
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async read(id){
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readAll(){
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id,data){
        try {
            const response = await this.model.findByIdAndUpdate(
                id,
                data,
                {new: true}
            );
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async destroy(id){
        try {
            const response = await this.model.findByIdAndRemove(id);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = CrudRepository;