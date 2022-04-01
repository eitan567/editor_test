<template>
  <div id="app">
    <vue-editor
      ref="qlEditor"
      id="qlEditor"
      v-model="content"
      :editorOptions="editorSettings"
      @ready="(quill) => (editorQuill = quill)"
    />

    Number of chars : {{ editorQuill ? editorQuill.getLength() : "" }}
    <div id="popup">
      <input type="button" class="btn" />
    </div>
  </div>
</template>

<script>
import { Quill } from "vue2-editor";
// import MediumEditor from "medium-editor";
// import "medium-editor/dist/css/medium-editor.css";
import jQuery from "jquery";

var cr = [];

jQuery("#popup").on({
  click: function (e) {
    e.stopPropagation();
  },
});

let AlignStyle = Quill.import("attributors/style/align");
let BackgroundStyle = Quill.import("attributors/style/background");
let ColorStyle = Quill.import("attributors/style/color");
let DirectionStyle = Quill.import("attributors/style/direction");
let FontStyle = Quill.import("attributors/style/font");
let SizeStyle = Quill.import("attributors/style/size");

Quill.register(AlignStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);

jQuery(document).on({
  click: function () {
    jQuery("#popup").hide();
  },
  mouseup: function () {
    cr = window.getSelection().getRangeAt(0).getClientRects();
  },
  mousemove: function (ev) {
    for (var i = 0; i < cr.length; i++) {
      if (
        ev.pageX >= cr[i].left &&
        ev.pageX <= cr[i].right &&
        ev.pageY >= cr[i].top &&
        ev.pageY <= cr[i].bottom
      ) {
        jQuery("#popup")
          .css({
            top: cr[0].top - jQuery("#popup").outerHeight(),
            left: cr[0].left,
          })
          .show();
        break;
      }
    }
  },
});

// new MediumEditor("#qlEditor", {
//   toolbar: {
//     /* These are the default options for the toolbar,
//            if nothing is passed this is what is used */
//     allowMultiParagraphSelection: true,
//     buttons: ["bold", "italic", "underline", "anchor", "h2", "h3", "quote"],
//     diffLeft: 0,
//     diffTop: -10,
//     firstButtonClass: "medium-editor-button-first",
//     lastButtonClass: "medium-editor-button-last",
//     relativeContainer: null,
//     standardizeSelectionStart: false,
//     static: false,
//     /* options which only apply when static is true */
//     align: "center",
//     sticky: false,
//     updateOnEmptySelection: false,
//   },
// });

export default {
  name: "App",
  components: {},
  data: () => ({
    content: null,
    editorQuill: null,
    max: 10,
    editorSettings: {
      modules: {
        toolbar: {
          container: [
            [{ size: ["small", false, "large"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ header: 1 }, { header: 2 }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [
              { align: "right" },
              { align: "center" },
              { align: "" },
              { align: "justify" },
            ],
            [{ color: [] }, { background: [] }],
            ["clean"],
            ["link", "image", "video", "formula"],
          ],
        },
      },
    },
  }),
  watch: {
    content: function () {
      this.max = 100;
      if (!!this.max && this.editorQuill.getLength() >= this.max) {
        this.editorQuill.deleteText(this.max, this.editorQuill.getLength());
      }
    },
  },
  mounted() {
    this.$refs.qlEditor.quill.format("direction", "rtl");
    this.$refs.qlEditor.$el.style.backgroundImage="url(/img/logo.82b9c7a5.png)";
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#popup {
  position: absolute;
  color: white;
  background: #666;
  padding: 0.5em;
  display: none;
}
</style>
