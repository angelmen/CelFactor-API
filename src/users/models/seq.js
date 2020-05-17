exports.getSequence = async function(company_id, model){
    model.find({belong_to: company_id})
        .select({"id": 1, "_id": 0})
        .then(data => {
            var seq = 0;
            data.forEach(element => {
                if(element.id >= seq) seq = element.id;
            });
            return seq
        })
}