// $('.cat img').click(function() {
//   var count = Number($(this).siblings('.count').text());
//     $(this).siblings('.count').text(++count);
//     console.log("click");
// });

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Mau',
            imgSrc : 'images/cat.jpg'
        },
        {
            clickCount : 0,
            name : 'Moo',
            imgSrc : 'images/white_cat.jpg'
        }
    ]
};

var octopus = {
    init: function() {
        //set currentCat to first in the list..
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    //set currentl-selected cat to the object pass in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    //increments counter for current cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    adminCancel: function() {
        console.log('adminCancel has been called');
        // $("#click-field").remove();
        // $("#src-field").remove();
        $("#save-button").remove();
        $("#cancel-button").remove();
        $("#admin-button").toggle();
        $(".admin").remove();
        $("#name-field").remove();
        $("#click-field").remove();
        $("#src-field").remove();
    },

    saveInfo: function() {
        console.log('saveInfo called');
        var currentCat = octopus.getCurrentCat();
        console.log("before save it's " + currentCat.name);
        console.log("#name-field".value);
        currentCat.name = document.getElementById('name-field').value;
        currentCat.clickCount = document.getElementById('click-field').value;
        currentCat.imgSrc = document.getElementById('src-field').value;
        console.log("saved and now it's " + currentCat.name);
        catView.render();
        catListView.render();
        console.log('removing buttons');
        $("#save-button").remove();
        $("#cancel-button").remove();
        $(".admin").remove();
        $("#name-field").remove();
        $("#click-field").remove();
        $("#src-field").remove();
        $("#admin-button").toggle();
        //document.getElementById('click-field').value = currentCat.clickCount;
    },

};

var catView = {

    init: function() {
        // store pointers to DOM elements for later
        this.catElem = document.getElementById('cat');
        this.catName = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');         

        //on click, increment the current cat's counter
        $('#cat-img').click(function() {
            octopus.incrementCounter();
        });
    
        // render this view (update the DOM elements with the right values)
        this.render();
    },
    
    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catName.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        console.log(this.catImageElem.src);
        console.log(this.catName);
    },
};

var catListView = {

    init: function() {
        //store the DOM elem for easy access
        this.catListElem = document.getElementById('cat-list');

        //render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll render from octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            console.log(cats.length);
            // this is the cat we're currently looping over
            cat = cats[i];
            console.log(cat.name);
            //make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            //finally, add element to list
            this.catListElem.appendChild(elem);
            console.log(elem, " appended");
        }
    }
};

var adminView = {
    init: function() {
        // store pointers to DOM elements for later
        var currentCat = octopus.getCurrentCat();
        // this.catElem = document.getElementById('cat');
        // this.catName = document.getElementById('cat-name');
        // this.catImageElem = document.getElementById('cat-img');
        // this.countElem = document.getElementById('cat-count');
        console.log("entered admin mode");
        //console.log(this.catName);

        this.catInfo();
    },
    catInfo: function() {
        console.log('called catInfo');
        var currentCat = octopus.getCurrentCat();
        console.log(currentCat.name);
        
        //var othername = currentCat.name
        //$("#admin-info").append("");
        $("#admin-info").append('<button onclick="octopus.saveInfo()" id="save-button" style="border-color: blue;">Save</button>');
        $("#admin-info").append('<button onclick="octopus.adminCancel()" id="cancel-button" style="border-color: blue;">Cancel</button>');
        $("#admin-info").append('<div class="admin"><h4>Name: <h4></div><input type="text" id="name-field" name="one+count" value=" " class="admin" style="border-color: blue;">');
        document.getElementById('name-field').value = currentCat.name;
        $("#admin-info").append('<div class="admin"><h4>click count: <h4></div><input type="text" id="click-field" name="two+count" value=" " class="admin" style="border-color: green;">');
        document.getElementById('click-field').value = currentCat.clickCount;
        $("#admin-info").append('<div class="admin"><h4>imgSrc: <h4></div><input type="text" id="src-field" name="three+count" value=" " class="admin" style="border-color: red;">');
        $("#admin-button").toggle();
        console.log(currentCat.imgSrc);
        document.getElementById('src-field').value = currentCat.imgSrc;
        
    },
    // adminCancel: function() {
    //     $("#admin-info").remove("#cancel-button");
    //     $("#admin-info").remove("#name-field");
    //     $("#admin-info").remove("#click-field");
    //     $("#admin-info").remove("#src-field");
    //     //var currentCat = octopus.getCurrentCat;
    // },

    submitButton: function() {
        var currentCat = octopus.getCurrentCat();
        currentCat.name =  document.getElementById('name-field').value;
    }

};


octopus.init();