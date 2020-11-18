var reqCourseController =(function () {
    const course= function (name, author) {
        this.name=name;
        this.author=author;
    };
    const data=[];
    console.log(data)
    return {
        addItem: function (name,author) {
            var newItem;
            newItem= new course(name,author)
            data.push(newItem)
            return newItem;
        }
    }

})();
var requestUi=(function () {
    return {
        getInput: function() {
            return {
                nameCourse: document.querySelector('.name').value, // Will be either inc or exp
                authorName: document.querySelector('.author').value,
            };
        },
        addListItem: function(obj) {
            console.log(obj)
            var html;
            html= `
                <div class="col-md-3">
                    <div class="card">
                        <img src="img/${obj.name}.png" class="img-fluid img-card" onerror="this.style.display='none'">
                        <div class="card-body">
                            <h1>${obj.name}</h1>
                            <h2>${obj.author}</h2>
                        </div>
                    </div>
                </div>
            `
            document.querySelector('.courseArray').insertAdjacentHTML('beforeend', html);
        },
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll('.name' + ', ' + '.author');

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        }
    }
})();
var controller=(function (reqCrl,uicrl) {
    var setupEventListeners = function() {
        document.querySelector('.btn').addEventListener('click', function (e) {
            e.preventDefault()
            var input, newItem;

            // 1. Get the field input data
            input = uicrl.getInput();
            console.log(input.nameCourse)

            if (input.nameCourse !== "" && input.authorName !== "") {
                // 2. Add the item to the budget controller
                newItem = reqCrl.addItem(input.nameCourse, input.authorName);
                // 3. Add the item to the UI
                uicrl.addListItem(newItem);
                console.log(newItem)
                // 4. Clear the fields
                uicrl.clearFields();
            }

        });
    };
    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };
})(reqCourseController,requestUi);
controller.init()