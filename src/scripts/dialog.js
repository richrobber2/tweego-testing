// dialog API macro set, by chapel; for sugarcube 2
// version 1.3.0
// see the documentation: https://github.com/ChapelR/custom-macros-for-sugarcube-2#dialog-api-macros

// <<dialog>> macro
Macro.add('dialog', {
    tags : ['onopen', 'onclose'],
 handler : function () {
     
     // handle args (if any)
     // array of error codes
     var errors = [];
     var content = '', onOpen = null, onClose = null;
     // add title if there are any arguments for args[0]
     var title = (this.args.length > 0) ? this.args[0] : '';
     // array of classes
     var classes = (this.args.length > 1) ? this.args.slice(1).flatten() : [];

     // iterate through payload and update callbacks accordingly
     this.payload.forEach( function (pl, idx) {
         if (idx === 0) {
             content = pl.contents;
         } else {
             if (pl.name === 'onopen') {
                 onOpen = onOpen ? onOpen + pl.contents : pl.contents;
             } else {
                 onClose = onClose ? onClose + pl.contents : pl.contents;
             }
         }
     });
     
     // add the macro- class
     classes.push('macro-' + this.name);
     
     // dialog box
     // add classes to dialog title
     Dialog.setup(title, classes.join(' '));
     // initialize wiki dialog
     Dialog.wiki(content);

     // should these be shadowWrapper-aware?
     // run on open callback if defined
     if (onOpen && typeof onOpen === 'string' && onOpen.trim()) {
         $(document).one(':dialogopened', function () {
             $.wiki(onOpen);
         });
     }

     // restore wiki on close event
     if (onClose && typeof onClose === 'string' && onClose.trim()) {
         $(document).one(':dialogclosed', function () {
             $.wiki(onClose);
         });
     }

     // open the dialog
     Dialog.open(); 
 }
});

// <<popup>> macro
Macro.add('popup', {
 handler : function () {
     
     // error handling
     // need at least one argument to display
     if (this.args.length < 1) {
         return this.error('need at least one argument; the passage to display');
     }
     // if the story does not exist return error
     if (!Story.has(this.args[0])) {
         return this.error('the passage ' + this.args[0] + 'does not exist');
     }
     
     // passage name and title
     // get title and classes from args
     var psg   = this.args[0];
     var title = (this.args.length > 1) ? this.args[1] : '';
     var classes = (this.args.length > 2) ? this.args.slice(2).flatten() : [];
     
     // add the macro class to the dialog
     classes.push('macro-' + this.name);
     
     // dialog box
     // open dialog with story (passage) and process the text
     Dialog.setup(title, classes.join(' '));
     // inject psg to the story args[0]
     Dialog.wiki(Story.get(psg).processText());
     // open the dialog
     Dialog.open();
     
 }

});

// <<dialogclose>> macro
// add the dialog close macro all this will do is close that open dialog who could have guessed
Macro.add('dialogclose', { 
 skipArgs : true, 
 handler : function () {
     Dialog.close();
 } 
});