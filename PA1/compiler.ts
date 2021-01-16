import { isReturnStatement } from "typescript";
import { Stmt, Expr } from "./ast";
import { parse } from "./parser";

// https://learnxinyminutes.com/docs/wasm/

type LocalEnv = Map<string, boolean>;

type CompileResult = {
  wasmSource: string,
};

export function compile(source: string) : CompileResult {
  const ast = parse(source);
  const definedVars = new Set();
  ast.forEach(s => {
    switch(s.tag) {
      case "define":
        definedVars.add(s.name);
        break;
    }
  }); 
  const scratchVar : string = `(local $$last i32)`;
  const localDefines = [scratchVar];
  definedVars.forEach(v => {
    localDefines.push(`(local $${v} i32)`);
  })
  
  const commandGroups = ast.map((stmt) => codeGen(stmt));
  const commands = localDefines.concat([].concat.apply([], commandGroups));
  console.log("Generated: ", commands.join("\n"));
  return {
    wasmSource: commands.join("\n"),
  };
}

function codeGen(stmt: Stmt) : Array<string> {
  switch(stmt.tag) {
    case "define":
      var valStmts = codeGenExpr(stmt.value);
      return valStmts.concat([`(local.set $${stmt.name})`]);
    case "expr":
      var exprStmts = codeGenExpr(stmt.expr);
      return exprStmts.concat([`(local.set $$last)`]);
  }
}

function codeGenExpr(expr : Expr) : Array<string> {
  switch(expr.tag) {
    case "builtin1":
      const argStmts = codeGenExpr(expr.arg);
      return argStmts.concat([`(call $${expr.name})`]);

    case "bin_op":
      const argStmt1 = codeGenExpr(expr.arg1);
      const argStmt2 = codeGenExpr(expr.arg2);
      const argStmt = argStmt1.concat(argStmt2);
      switch(expr.op){
        case "+":
          return argStmt.concat(["(i32.add)"]);
        case "-":
          return argStmt.concat(["(i32.sub)"]);
        case "*":
          return argStmt.concat(["(i32.mul)"]);
      }
      return

    case "builtin2":
      const arg1 = codeGenExpr(expr.arg1);
      const arg2 = codeGenExpr(expr.arg2);
      const argStm = arg1.concat(arg2);
      return argStm.concat([`(call $${expr.name})`]); 

    case "num":
      return ["(i32.const " + expr.value + ")"];
    case "id":
      return [`(local.get $${expr.name})`];
  }
}
