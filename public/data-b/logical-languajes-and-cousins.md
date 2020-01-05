# Logical languajes and cousins

> **WIP**

I was on one of my random YouTube programming adventures (A.K.A. queing up related videos non-stop*) when I stumbled upon this excellent talk by Aja Hammerly ([@the_thagomizer](https://twitter.com/the_thagomizer)). The talk itself is very interesting, but I became specially fascinated by **prolog**, a programming languaje. A _logical_ (!!) programming languaje. This means that the languaje itself does not define a "program" that "runs" (with functions, data structures, etc).

Instead, prolog expressions are concepts from the logic world such as **facts** and **rules**. Simply speaking, facts describe pieces of data, while rules describe the relationships between those pieces of data (formal logic). Prolog has also been described (pun intended) as a descriptive or declarative languaje.

## Logic and reason

Logic has always fascinated me since I was very young and I discovered the world of [argumentation theory](https://en.wikipedia.org/wiki/Argumentation_theory). I spent countless hours reading everything I could find about logic and reason, learning about fallacies, inference... One thing that was always a mindf*ck to me was how a few self-evident axioms, often refered to as the three fundamental laws of logic, are the basic for all rational discourse:

- Law of identity

> 'Whatever is, is.'

```
A = A
```

A is always A. Everything is equal to itself.

- Law of no contradiction

> 'Nothing can both be and not be.'

```
¬(A∧¬A)

friendly version:

not(A and not A)
```

A and not A cannot be true at the same time. In other words, two contradictory statements cannot be both true. If my hair is red, then my hair cannot be green.

- Law of excluded middle

'Everything must either be or not be.'

```
A∨¬A

friendly version:

A or not A
```

Either A is true or not A is true, there's no other option. Either my hair is red or my hair is not red. One of those statements must be true.

## Anyway...

If you want to learn about logic, there's already a ton of resources out there like the Wikipedia (which, btw, has many excellent articles about it), but it is not the focus of this article.

The prolog logical languaje isn't either, but you can learn more about it by watching [this awesome introductory talk](https://www.youtube.com/watch?v=hEOVcLAPRG8&t=1546s) (also by Aja Hammerly) and [this great YouTube tutorial](https://www.youtube.com/watch?v=SykxWpFwMGs&t=913s).

Going back to my little adventure, I was messing with prolog and one of the things I wanted to experiment with was describing and querying genealogic (haha, _logic_) trees.

## Genealogic trees

I started by repeatedly declaring a bunch of simple `parent` facts. To make it simple, a person only has one parent for now:

```prolog
parent(alice, bob). % parent, child
parent(alice, fitgerald).
parent(bob, charles).
parent(bob, gerald).
parent(charles, diana).
parent(fitgerald, helen).
parent(charles, earl).
```
## Direct relationships

An obvious first rule is that if X is the parent of Y, then Y is the child of X:

```prolog
child(X, Y) :- % X is the child of Y
    parent(Y, X).
```

Easy. Let's do grandparents:

```prolog
grandparent(X, Y) :- % X is the grandparent of Y
    parent(X, A),
    parent(A, Y).

grandchild(X, Y) :-  % X is the grandchild of Y
    grandparent(Y, X).
```

By chaining two `parent` facts, we can define a `grandparent` rule. By "inverting" this rule, we can define the `grandchild` rule. "Inverting" rules is a pattern I'm gonna be using throughout the code a lot because it is very useful for this use case.

Now great-grandparents:

```prolog
greatgrandparent(X, Y) :- % X is the great-grandparent of Y
    grandparent(X, A),
    parent(A, Y).

greatgrandchild(X, Y) :- % X is the great-grandchild of Y
    greatgrandparent(Y, X).
```

Similarly, we can chain a `grandparent` rule with a `parent` rule to make a `greatgrandparent` rule, and invert it to create a `greatgrandchild` one.

What about siblings? Let's see:

```prolog
sibling(X, Y) :- % X and Y are siblings
    parent(Parent, X),
    parent(Parent, Y),
    X\==Y.
```

By using a single `Parent` variable in these two `parent` facts, we are making sure that we only match cases in which X and Y have the same parent. Of course, if X and Y have the same value (for example: bob), then this condition will be true. However, bob cannot be his own sibling. This is why we use the `\==` operator, which (very) roughly means `not equal to`.

There's a problem with this operator, and it is explained on the introductory talk I have already linked, but long story short I'm gonna use a different operator (`@>`):

```prolog
sibling(X, Y) :- % X and Y are siblings
    parent(Parent, X),
    parent(Parent, Y),
    X@>Y.
```

There we go. Now, what's up with aunts and uncles?

```prolog
auntoruncle(X, Y) :- % X is the aunt or uncle of Y
    parent(A, Y),
    sibling(A, X).

nieceornephew(X, Y) :- % X is the niece or nephew of Y
    auntoruncle(Y, X).
```

Easy, X is the aunt or uncle of Y if it is a sibling of their parent (A). And of course, we invert it as well.

There's also great uncles / aunts (the siblings of your grand-parents):

```prolog
greatauntoruncle(X, Y) :- % X is the great aunt or uncle of Y
    grandparent(A, Y),
    sibling(A, X).

greatnieceornephew(X, Y) :- % X is the great niece or nephew of Y
    auntoruncle(Y, X).
```

Same as before, but with `grandparent` instead of just `parent`.

## Descendants and ascendants

What if we want to know whether someone is a descendant or ascendant of someone else?

Who is your descendant? Well, your child. Or your child's child. Or the child of your child's child. Or the child of the child of your child's child. Or the... You get the point.

Your descendant is someone who is related to you by N steps of **parenthood** relationships. It doesn't matter how many jumps.

Let's see how we can do this:

```prolog
descendant(X, Y) :- % X is a descendant of Y
    child(X, Y).
descendant(X, Y) :-
    child(X, A),
    descendant(A, Y).

ascendant(X, Y) :- % X is an ascendant of Y
    descendant(Y, X).
```

X will be a descendant of Y if:

- X is the child of Y
- X is the child of a descendant of Y

Yay, recursion! By inverting it, we can also create the `ascendant` relationship rule.

These two rules work just fine, but what if we also want to somehow establish the "jumps" or "steps" between those relationships? For example, a child and a parent have a distance of 1. A great-grandchild and a great-grandparent have a distance of 3. How can we integrate this into our rules?

```prolog
descendant(X, Y, N) :- % X is a descendant of Y
    child(X, Y),
    N is 1.
descendant(X, Y, N) :-
    child(X, A),
    descendant(A, Y, N1),
    N is N1+1.

ascendant(X, Y, N) :- % X is an ascendant of Y
    descendant(Y, X, N).
```

This might seem complicated, but it's actually nothing more than an accumulator that adds 1 to its value with each recursive call.

Ok, we have covered all relationships and we are done now. Thank you for reading. Please like and subscribe and follow me on Instagram and TikTok.

Just kidding, of course. We're missing a very important relationship.

## Cousins!!

Cousins are a really interesting case. To understand why, let's take a look back at the different types of relationships we've already seen.

> Important note: I'm gonna completely make up my own model and vocabulary to explain this part. This is the further thing from reality you will probably find, but I'm too lazy to search for the right therminology. The information is only provided as a way to explain myself in this context and should be treated as if I had pulled it right out of my ass. In fact, I have.

- "Direct" relationships: parent, child, grandparent, sibling...

These relationships are "direct", in the sense that they can be described in a very specific and constant way. Your uncle or aunt is "the sibling of your parent". Your grandchild is "the child of your child". That's all there is to it.

- "Dimensional" relationships: descendant, ascendant...

In these relationships, instead of specifying a specific description (or "point"), it is more like a "vector" in which you have to specify a value for its dimension(s). In the case of descendant and ascendant relationships, there's a single "vertical" dimension and they have a value that pin them to a specific point from a vast array of "positions". You descendant could be your child, or grandchild, or great-grandchild. Your descendant with a distance of one IS your child. Your descendant with a distance of two IS your grandchild.

Now, the cousin relationship is dimensional. More specifically, it has two dimensions:

- Degrees: "horizontal" dimension, roughly speaking.
- Removals: "vertical" dimension, roughly speaking. This is comparable to the distance in the descendant / ascendant relationships.

There is an excellent video by the Vsauce creator that explains these concepts in a very clear way, so I'll leave it to Michael and assume you are gonna watch it and come back knowing all the facts from the video.

[Here's the video.](https://www.youtube.com/watch?v=IFngqro5yyQ&t=320s)

Take your time.

Oh, no, don't mind me. I'll get a coffee meanwhile.

Ah, nice weather, eh? Kinda scary that it is this hot in December though. Climate change is getting really serious, it's f*cked up. These corporations really don't give a sh*t about... Uh? Oh! You're done.

Ok, let's code some more then!

WIP
