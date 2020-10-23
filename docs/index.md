# Blackboard Quiz Generator
## Overview
Blackboard Quiz Generator is a tool for generating multiple-answer questions formatted in a way that is suitable for import as question pools in Blackboard. Through the use of random variables, it enables the user to create five hundred instances of a given question, providing students with an essentially randomised experience akin to a regular e-assessment tool such as Numbas or Moebius. Unlike those systems, Blackboard is not able to handle free-text input in a mathematically sophisticated way, and thus only pre-defined answers are available.

Nevertheless, as a native tool for Blackboard it has certain advantages, such as immediate and accurate access to marks from these small assessments. This document is not intended to discuss use cases in detail, but one immediate use case is so that an academic can implement adaptive release for materials contingent on the score on a randomly-parametrised quiz.

This tool is developed within the University of Leeds and is optimised for its instance of Blackboard. Please note that other institutions' systems may use different conventions for, _inter alia_, announcing MathJax content.

## The structure of an assessment item
An individual assessment item is composed of several elements, in two categories: one element, in a category of its own, is the question; the other elements, in the other category, are the answers.
* The question may have some _random variables_ associated with it, as well as some _derived variables_ that are calculated from those _random variables_. Question derived variables are computed exactly once for the assessment item.
* Each answer may have its own random variables, as well as derived variables that are calculated from those _random variables_. These _derived variables_ are re-computed for each answer to be displayed to the student.

## Using variables
**Making new variables.** The 'add' button allows you to create a new variable. Please note that there is not currently any functionality to remove variables once added.

**Random variables.** These must have a name, and then be either an integer taking a value between a certain minimum and maximum, or else a floating-point decimal ('float'), also between a minimum and a maximum. In Javascript, the underlying language, floats are accurate up to 15 digits.

**Derived variables.** These must have a name and a formula, which will typically take in the names of other variables, both random and derived. The underlying mathematical parser is [math.js](https://mathjs.org), and all its functions are available. You are encouraged to read up on its capabilities there to determine how to achieve your desired effect. The output from a derived variable is typically an expression that will display properly in a LaTeX environment; to compute the actual value, make sure that the 'simplify' box is ticked.

## Presenting the assessment item to the student
Once all the variables are set up, you will want to present a question and its answers to the student.

**Presenting the question.** The large text box in the 'Question' section lets you present the question to the student. Typically, this will be a mixture of plain text, LaTeX and variables (processed either in plain text or in LaTeX).
* **Plain text** is inputted in the natural way, by typing in the text.
* **LaTeX expressions** are announced by use of \\( and \\) for inline equations, or \\[ and \\] for display equations. MathJax is the underlying display engine for both this tool and the University of Leeds' instance of Blackboard.
* **Variables** can be displayed by enveloping them in the symbols ${ and }. These symbols can be used within a MathJax environment where a variable returns a LaTeX expression.

**Presenting the answers.** The engine that generates answers is set up to behave in a particular way. Firstly, it must be told the exact number of answers to be generated: then, correct and incorrect answer templates may be written. Each template must be specified to appear a certain minimum (which could be zero) and maximum number of times in the total set of answers. This allows for different distractors to be written and selected at random.

The 'expression' box templates the answer, as the student will see it. It functions in the same way as the question definition above.

## Previewing your assessment items
Once you have set up your question and answers, you may run a preview to test the question and ensure that it is working as you need. Answers that have been defined to be correct will be displayed with their box ticked. We advise that you run several previews to increase your confidence that you have set everything up as you wish, before finalising your question pool.

## Generating a question pool
Once you are satisfied that you will have a set of questions that work correctly, you may generate the required text file for upload into Blackboard. Under 'Generate TSV file', you may adjust the name of the resulting text file, before clicking on 'Download' to generate and download the question pool. This will spin up 500 instances, typically unique, of your assessment item. As a result of both the number of instances and the complexity of questions, please be advised that this is a lengthy process for even the smallest questions, and larger questions may cause your browser or computer to stop responding for some time. Howeve,r it will be working. You may wish to wait to generate a run of questions until you will be taking a break from the computer.
