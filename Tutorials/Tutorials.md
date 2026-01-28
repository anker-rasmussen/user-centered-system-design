# Tutorial 1
## Bad UI!

### Articulate why each design is bad?

### Dropdowns

[Link](https://www.reddit.com/r/badUIbattles/comments/1i6ml3c/when_a_developer_only_knows_dropdowns/)

Why is this design problematic? 

Dropdowns for *everything* is quite frankly an insane design pattern. Users have to scroll through an insane amount of options (and their name/email address/*preferred* password) may not even be part of the selection. The users have no search feature to access what they want, and even though it's in alphabetical order this is just an insane way to handle things. You can't have every iteration of name, email, password, etc..

What could be better?

Almost anything would be better. A textbox to input most of these fields would be better. For date a calendar picker would be better. 
The context of this looks like it's for a job application - especially with the "preferred" salary selection box.

### World's safest form

[Link](https://www.reddit.com/r/badUIbattles/comments/1hv78mp/i_created_the_worlds_safest_form/)

Why is this design problematic?

Requiring a user to complete a captcha for each character input makes the entire act of "logging in" tedious and slow. With the captcha being in plaintext a simple OCR model could read and input faster than a human thereby completely invalidating the tedium that a user would go through while attempting to login to this.

What would be better?

Better obfuscation for each captcha, making it difficult for OCR models to read and input, and just one captcha upon login. This follows design of most modern login forms. 

### Date picker

[Link](https://www.reddit.com/r/badUIbattles/comments/1hqdiux/my_submission_for_the_most_annoying_date_picker/)

Why is this design problematic?

The years are completely randomized and not in an order. The years are outside of reasonable ranges (1810-2094 in the demonstration video). The months are also not denoted by which month they are - rather just numbers; and while 1 may correspond to January, the range for months is anywehre from 1-37 (as seen in the video).
There also isn't the option to pick a *specific* month as the months do not iterate through the list.
Days follow the same bad design issue with randomized dates ranging far out of bounds of a normal month.

What would be better?

This could be fixed by bounding years to sensible ranges(1900-2026), and displaying them in a sorted manner with a scroll bar.
The same suggestion also applies to months and days (1-12 & sorted), (1-31 & sorted) respectively. This is pretty common in most signup forms where the website requires a users age.

### Orange screen of life

[Link](https://www.reddit.com/r/badUIbattles/comments/pezvat/youve_heard_of_the_blue_screen_of_death_now_enjoy/)

Why is this design problematic?

The user does not need to be told when something executes succesfully - as this is a pattern generally used for failures. When the user gets a notification (especially during startup), they have been conditioned to having negative experiences; i.e. the blue screen of death.
When the user recieves a notification "your computer booted successfully", this would make the user assume something had gone wrong but the machine is covering up its faults.

How could this be fixed?

Don't notify the user when execution along the happy path is occuring. Reserve notifications (especially large fullscreen hijack notifications) for failures/critical errors that prevent the user from using the system. Doing this just stops the user from using the system when everything is "functioning normally". This kind of thing is normally displayed when errors occur on a variety of different applications or devices.

### Country selector

[Link](https://www.reddit.com/r/badUIbattles/comments/g4aytv/tired_of_dropdowns_try_our_new_pixel_art_country/)

Why is this design problematic?

This design is highly problematic for some countries - as in the video this is pixel art. In order to faithfully render your countries flag you have to represent it in a small pixel art drawing. You have only a limited selection of colors (if your country is highly similar to another i.e. Netherlands and Luxembourg), there would be no visual difference (there is only one blue and one red!). This design would also not allow for countries with odd-size flags (i.e. Nepal).

What would be better?

I like the idea of drawing your flag to select which country you're from. It's a cute way to say introduce yourself, where this would be printed on badges and people would have to guess where you're from based on your rendering of your flag. The way I'd fix this is give an RGB color picker with some base selections, and increase the pixel density of the drawing board. I'd also add configuration for special shaped flags (fx. Nepal again).