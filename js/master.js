(function () {
  // select the cars from the DOM (the web page) using the data-ref class. this creates a list of elements; it's like an array, so we can loop through them and do things like add event listeners and change classes one at a time with a forEach method (method is just another word for function)

  // constants are exactly what the word means - something that doesn't change. You can't change or redefine a constant once it's declared, so they're good for things that are meant to be constant throughout the runtime of an app
  const carButtons = document.querySelectorAll('.data-ref');

  // the XMLHttpRequest object is a built-in part of every browser's JavaScript API. It has methods (functions) and propeties that you can run to do an AJAX request. Declaring it with round brackets at the end instantiates (creates) a new instance of the object.

debugger
  // the getCarData function fires every time you click on a car thumbnail; it passes itself into the function (the 'this' keyword referes to the object that called the function => the element clicked on) so that we can use that element's ID attribute as a reference to pass to the query we want to run. We're retrieving a single row from the database where the ID that we pass matches the field we've referenced in the query (in the functions.php file)
  function getCarData() {
    const url = './includes/functions.php?carModel=' + this.id;
  // fetchAPI uses the promis API (new for ES6)
    // fetch(url)
    // .then((resp) => resp.json())
    // .then((data)) => { processResults(data); }
    // .catch(function(error){
    //   console.log(error);
    // });

    fetch(url) // this does the AJAX call
        .then((resp) => resp.json())
        .then(({ modelName, pricing, modelDetails, model })) => {
              let model = document.querySelector('.modelName').textContent = modelName;
              let price = document.querySelector('.priceInfo').innerHTML = pricing;
              let desc = document.querySelector('.modelDetails').textContent = modelDetails;

              carButtons.forEach(function(car, index) {
                car.classList.add('nonActive');
              });
              // the backticks are a new ES6 thing called a template string (look it up)
              document.querySelector(`#${data.model}`).classList.remove('nonActive');
            }
        )
        .catch(function(error) {
          console.log(error);
        });


  carButtons.forEach(function(car, index) {
    car.addEventListener('click', getCarData, false);
  });

  })();
