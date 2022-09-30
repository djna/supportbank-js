


function doWork(workWith){

    let x = workWith ** 2;
    console.log(`ONE: x = ${x}`);

    setTimeout(
      function() {
        console.log(`TWO: x = ${x}`);
        x += 100;
        console.log(`THREE: x = ${x}`);
        return x;
      }, 5 * 1000
    );

    setTimeout(
        function() {
          console.log(`LATER: x = ${x}`);
        }, 10 * 1000
      );


    x++;
    console.log(`FOUR: x = ${x}`);
    return x;
}

let x = doWork(7);
console.log(`FIVE: x = ${x}`);
