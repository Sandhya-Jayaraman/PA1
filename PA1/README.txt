PA 1 Writeup:

Question 1:
Give three examples of Python programs that use binary operators and/or builtins from this PA, but have different behavior than your compiler.
Answer:
1. Use of brackets in arithmetic expressions: The parser does not take into account presence of brackets in input statements, and they aren't accounted for in the ast.
example: a = (8 + 1) * 9
2. Absolute values of negative numbers: While a user can use the abs() function to find the abolute value of an expression with a negative result, a negative number is interpreted as a number on which the unary minus operates.
example: abs(-2)
3. Computation on decimal values: The compiler only works with the i32 data type as of now.
example: 3.2 + 3.4

Question 2:
Approximately how many hours did it take you to complete the assignment? What parts took the longest?
Answer:
It took me about 24 hours to complete the assignment(and it still feels quite incomplete). The part that took me the longest(about 5 hours) was figuring out why my binary expressions had suddenly stopped evaluating(turns out I had accidentally pasted an extra c.parent() in the code).
Figuring out how to use the same CallExpresion case to cover two types of possible input took me a while to figure out as well.

Question 3:
What advice would you give yourself if you were to start the assignment from the beginning?
Answer: 
Please ensure no accidental Ctrl-Vs in the code! :) 

Question 4:
What resources did you find most helpful in completing the assignment?
Answer:
The lectures and reading material on the course website(especially the Stack Machines and Assembly PDF) helped. I also found the Mozilla MDN web docs useful.

Question 5:
Who (if anyone) in the class did you work with on the assignment?
Answer:
I did most of the assignment on my own. I did get some help with the min and max functions from Yousef at the OH. I sincerely thank Hema from this class for figuring out why my binary expressions did't work.
