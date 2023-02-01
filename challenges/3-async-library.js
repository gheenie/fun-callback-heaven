function mapAsync(collection, iteratee, callback) {
    for (let i = 0; i < collection.length; i++) {
        const element = collection[i];
        
        setTimeout(iteratee(element), 3000);
    }
}

module.exports = mapAsync;
