/*
  Coding Problem #1
  Write a method, `findMax`, that will accept an object collection, `collection`, 
  and a string, `key`.
  
  The method should return the maximum value in the collection for the given
  key.
*/

function findMax (collection, key){
    var maxN = 0;
    for (var k in collection){
        if (key == k){
            maxN = Math.max.apply(Math, collection[key]);
        }
    }
    return maxN;
}

var obj = {
    obj1 : [1,2,3,4,5],
    obj2 : [6,7,8,9,10],
    obj3 : [11,12,13,14,15]
};

console.log(findMax(obj, 'obj2'));

/*
  Coding Problem #2
  Write a method, `findRecord`, that will take an object collection, `records` 
  and an integer, `object_id`.
  The method should iterate over `records` and return an object if the `object_id`
  matches the id of a record in the collection and throw an error message if the 
  record id was not found
*/

function findRecord (records, objec_id){
    
    for (var k in records){
        if (objec_id == k){
            return records[k];    
        }
    }
    return "Error: Not Record Found!";
    
}

var Records = {
    1:{
        Name : 'Roberto',
        Age : '38',
        Hobbie : 'Soccer'
    },
    2:{
        Name : 'Roger',
        Age : '25',
        Hobbie : 'Football'
    },
    3:{
        Name: 'Alicia',
        Age : '30',
        Hobbie : 'Basketball'
    }
    
}

console.log(findRecord(Records, 1));


/*
  Coding Problem #3
  Write a method, `searchRecords`, that will take an object, `node`, a string, `key`, 
  and string, `term`.
  The method should travers the tree to find all related nodes where `term` matches
  the `node`'s property for the given `key`.
  The original `node` should be considered immutable
  Additional Info:
  - `node` is expected to be a "node tree" 
  - The `node` will have an imbedded object collection, `children`, that is a collection 
    of nodes
  
  Example "node tree" object:
  {
    id: 1,
    name: 'Menu',
    description: 'Our super awesome food menu',
    children: []
  }
  Example of Search Results:
  term: 'Fr'
  key: name
  Results: (simplified)
  - Menu
  |-- Combo #1
  | |-- French Fries
  |-- Combo #2
  | |-- Frozen Dairy Product
  |-- French Fries
  |-- Fresh Fruit
  |-- Frozen Dairy Product
*/

var results = [];
function searchRecords(node, key, term) {
    if (node.children) {
        node.children.forEach(function (obj, index) {
            if (node.children[index].name.search(term) != -1){
                results.push(node.children[index].name);
            }
            searchRecords(obj, key, term);
        });
    }
    return results.length > 0 ? results : "Not Search Records Found!";
}

var nodeTree = {
    id: 1,
    name: 'Menu',
    description: 'Our Super Awesome Food',
    children: [
        {
            id: 1,
            name: 'Combo #1',
            description: 'Great Combo #1 Choices',
            children: [{
                id: 1,
                name: 'French Fries',
                description: 'Amazing Crunchy Potatoes'
            }]
        },
        {
            id: 2,
            name: 'Combo #2',
            description: 'Great Combo #2 Choices',
            children: [{
                id : 1,
                name: 'Frozen Dairy Product',
                description: 'Yummy Frozen Icecream'
            }]
        },
        {
            id: 3,
            name: 'French Fries',
            description: 'Soft Curly Potatoes'
        },
        {
            id: 4,
            name: 'Fresh Fruit',
            description: 'Healthy Choices'
        },
        {
            id: 5,
            name: 'Frozen Dairy Product',
            description: 'Frozen Yogurt Popsicles',
        }
    ]
}; 
console.log(searchRecords(nodeTree, 'Name', 'Fr'));


/*
Coding Problem #4

Write a method, getRecords, that will take a string, recordType, and an optional
integer, id

The method should query an API and return the result set for recordType
If an id is provided, the record should be returned instead of the record set.

Requirements:

    Must use Promises or async/await
    Must use JSONPlaceholder as your API, https://jsonplaceholder.typicode.com/.
*/




function getRecords(recordType, id){
    
    var promise = $.get("https://jsonplaceholder.typicode.com/"+recordType)
        .then(function (results){
            if (id != undefined){
                for (var k in results){
                    if (id-1 == k){
                        return results[k];
                    }
                }
            }
            else{
                return results;
            }
        }).catch(function(obj, status, error){
            return "Error : " +  status;
    });
    return promise;
}

$.when(getRecords('comments', 6)).done(function(data){
    console.log(data);
});



/*
  Challenge Question
  Using the IMBD API create an API and UI in your favorite language(s) that would allow 
  one to search movies, directors, actors, and IMBD votes. 
  Notes:
  - Use http://theimdbapi.org/ or your favorite API for IMDB
  Requirements:
  The UI MUST:
  - be searchable by Title, Director, Actor, IMDB ID,
  - pagination
  - detail view for Movie, Actor, Director.
  - sortable by Title, Director, Actor, IMBD likes.
*/



