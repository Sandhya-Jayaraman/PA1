import {run} from './runner';


function webStart() {
  document.addEventListener("DOMContentLoaded", function() {
    var importObject = {
      imports: {
        print: (arg : any) => {
          console.log("Logging from WASM: ", arg);
          const elt = document.createElement("pre");
          document.getElementById("output").appendChild(elt);
          elt.innerText = arg;
          return arg;
        },
        abs: (arg: number) => {
          const elt = document.createElement("pre");
          document.getElementById("output").appendChild(elt);
          //elt.innerText = String(arg);
          return Math.abs(arg);
        },
        max: (arg1: number, arg2: number) => {
          const elt = document.createElement("pre");
          document.getElementById("output").appendChild(elt);
          if (arg1 >= arg2){
            return arg1;
          }        
          else{
            return arg2;    
          };

        },
        min: (arg1: number, arg2: number) => {
          const elt = document.createElement("pre");
          document.getElementById("output").appendChild(elt);
          if (arg1 <= arg2){
            return arg1;
          }        
          else{
            return arg2;    
          };

        },
        pow: (arg1: number, arg2: number) => {
          const elt = document.createElement("pre");
          document.getElementById("output").appendChild(elt);
          return Math.pow(arg1,arg2);
        },
      },
    };

    function renderResult(result : any) : void {
      if(result === undefined) { console.log("skip"); return; }
      const elt = document.createElement("pre");
      document.getElementById("output").appendChild(elt);
      elt.innerText = String(result);
    }

    function renderError(result : any) : void {
      const elt = document.createElement("pre");
      document.getElementById("output").appendChild(elt);
      elt.setAttribute("style", "color: red");
      elt.innerText = String(result);
    }

    document.getElementById("run").addEventListener("click", function(e) {
      const source = document.getElementById("user-code") as HTMLTextAreaElement;
      const output = document.getElementById("output").innerHTML = "";
      run(source.value, {importObject}).then((r) => { renderResult(r); console.log ("run finished") })
          .catch((e) => { renderError(e); console.log("run failed", e) });;
    });
  });
}

webStart();
