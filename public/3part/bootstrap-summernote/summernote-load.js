/**
 * Created by ack on 2015/9/23.
 */
$(document).ready(function() {
    $('#summernote-editor').summernote({
        height: 200,   //set editable area's height
        codemirror: { // codemirror options
            theme: 'monokai'
        }
    });
});