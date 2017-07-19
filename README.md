# Werewolvesgame Project WIP

*Using React, React Router, Firebase, and many more things*

#### Instructions:
* You need a Firebase database with email auth enabled
* The only data you need in your database are the cards

###### Schema:
 ```
 Cards/
   de/
     uniquecCardKey/
       description: string
       name: string
       pictureback: string:url
       picturefront: string:url
   en/
     uniquecCardKey/
       description: string
       name: string
       pictureback: string:url
       picturefront: string:url
```
* Swap out the firebase config in ```config/constants``` with your own
* ```yarn```
* ```yarn start```
* Visit ```localhost:3000```

