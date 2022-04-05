<template>
  <div id="app">
    <div class="qlEditorContainer">
      <div class="card border-primary">
        <div class="row no-gutters">
          <div class="col-md-2 border-right">
            <div class="card-header" style="height: 73px;">
              <h4 class="m-0 p-2">Email Temlates</h4>
            </div>
            <div style="max-height: 660px;" class="overflow-auto">
              <div class="card text-center m-3">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>

              <div class="card text-center m-3">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>

              <div class="card text-center m-3">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-header">
              <h1
                class="card-title m-0"
                style="
                  display: flex;
                  align-items: baseline;
                  flex-wrap: nowrap;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-content: flex-end;
                "
              >
                Email Editor
                <h6 class="pl-2 m-0">(Supports Hebrew)</h6>
              </h1>
              <h5
                style="position: absolute; right: 20px; top: 31px;"
                v-html="message"
              ></h5>
            </div>
            <div class="card-body padding: 1rem;">
              <p class="card-text">
                <vue-editor
                  ref="qlEditor"
                  id="qlEditor"
                  class="qlEditor"
                  v-model="content"
                  :editorOptions="editorSettings"
                  @ready="(quill) => (editorQuill = quill)"
                />
              </p>
              <v-btn
                color="btn btn-primary float-right"
                elevation="3"
                @click="saveToFile"
                >Send Email</v-btn
              >
              <dir class="text-center">
                Number of chars :
                {{ editorQuill ? editorQuill.getLength() : "" }}
              </dir>
            </div>
          </div>
          <div class="col-md-2 border-left">
            <div class="card-header" style="height: 73px;">
              <h4 class="m-0 p-2">Email Temlates</h4>
            </div>
            <div style="max-height: 660px;" class="overflow-auto">
              <div class="card text-center m-3">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>

              <div class="card text-center m-3">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>

              <div class="card text-center m-3">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="tooltip-controls">
      <button id="bold-button"><i class="fa fa-bold"></i></button>
      <button id="italic-button"><i class="fa fa-italic"></i></button>
      <button id="link-button"><i class="fa fa-link"></i></button>
      <button id="blockquote-button"><i class="fa fa-quote-right"></i></button>
      <button id="header-1-button">
        <i class="fa fa-header"><sub>1</sub></i>
      </button>
      <button id="header-2-button">
        <i class="fa fa-header"><sub>2</sub></i>
      </button>
    </div>
    <div id="sidebar-controls">
      <button id="show-controls"><i class="fa fa-plus"></i></button>
      <span class="controls">
        <button id="image-button"><i class="fa fa-camera"></i></button>
        <button id="video-button"><i class="fa fa-play"></i></button>
        <button id="tweet-button"><i class="fa fa-twitter"></i></button>
        <button id="divider-button"><i class="fa fa-minus"></i></button>
      </span>
    </div>
    <div id="popup">
      <input
        type="button"
        value="dfgdf"
        class="btn btn-primary p-0 font-size-small"
      />
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<style src="./assets/css/custom.css"></style>
<style src="./assets/css/editor.css"></style>
<script>
import { Quill } from "vue2-editor";
import { IndentStyle } from "./assets/js/quillIndent.js";
// import jQuery from "jquery";
import axios from "axios";
import ImageResize from "quill-image-resize-module-plus";
// import "quill-emoji/dist/quill-emoji.css";
// import * as Emoji from "quill-emoji";
// Quill.register("modules/emoji", Emoji);

// <Quill
//   defaultValue=""
//   theme="snow"
//   modules={{
//     toolbar: toolbarOptions,
//     "emoji-toolbar": true,
//     "emoji-textarea": true,
//     "emoji-shortname": true,
//   }}
//   value={quill_data.delta}
// />

Quill.register("modules/imageResize", ImageResize);
Quill.register(IndentStyle, true);

let AlignStyle = Quill.import("attributors/style/align");
let BackgroundStyle = Quill.import("attributors/style/background");
let ColorStyle = Quill.import("attributors/style/color");
let DirectionStyle = Quill.import("attributors/style/direction");
// let DirectionClass = Quill.import("attributors/class/direction");
let FontStyle = Quill.import("attributors/style/font");
let SizeStyle = Quill.import("attributors/style/size");

Quill.register(AlignStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(DirectionStyle, true);
// Quill.register(DirectionClass, false);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);

const Parchment = Quill.import("parchment");
const LineStyle = new Parchment.Attributor.Style("lineHeight", "line-height", {
  scope: Parchment.Scope.INLINE,
  whiteList: ["10px", "12px", "16px"],
});
Quill.register(LineStyle, true);

// var cr = [];

// jQuery("#popup").on({
//   click: function (e) {
//     e.stopPropagation();
//   },
// });

// jQuery(document).on({
//   click: function () {
//     jQuery("#popup").hide();
//   },
//   mouseup: function () {
//     cr = window.getSelection().getRangeAt(0).getClientRects();
//   },
//   mousemove: function (ev) {
//     for (var i = 0; i < cr.length; i++) {
//       if (
//         ev.pageX >= cr[i].left &&
//         ev.pageX <= cr[i].right &&
//         ev.pageY >= cr[i].top &&
//         ev.pageY <= cr[i].bottom
//       ) {
//         jQuery("#popup")
//           .css({
//             top: cr[0].top - jQuery("#popup").outerHeight(),
//             left: cr[0].left,
//           })
//           .show();
//         break;
//       }
//     }
//   },
// });

var toolbar = {
  container: [
    [{ size: ["small", false, "large"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ header: 1 }, { header: 2 }],
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ direction: "rtl" }],
    ["clean"],
    ["link", "image", "video", "formula"],
    ["emoji"],
  ],
};

// Quill.register("air-bar", function (quill) {
//   var toolbar = quill.modules.toolbar.container;

//   // get the dimensions of the toolbar. Assuming that it doesn't change
//   toolbar.style.visibility = "hidden";
//   toolbar.style.position = "absolute";
//   var toolbar_width = toolbar.offsetWidth, // get the width and height so we can keep it from squashing at the edge of the page
//     toolbar_height = toolbar.offsetHeight;

//   toolbar.style.display = "none"; // hide it if it's not hidden already.
//   toolbar.style.visibility = "visible";
//   toolbar.style.opacity = "0";
//   toolbar.style.position = "fixed";
//   toolbar.style.transition = "opacity 300ms, left 300ms, top 300ms";

//   quill.on("selection-change", function (range) {
//     if (range.start == range.end) {
//       // no selection, fade out.
//       toolbar.style.opacity = 0;
//       setTimeout(function () {
//         toolbar.style.display = "none";
//       }, 300);
//     } else {
//       var selection_dimensions = window
//         .getSelection()
//         .getRangeAt(0)
//         .getBoundingClientRect(); // see http://stackoverflow.com/a/17887684/2661831 . Probably alchemy and/or black magic.

//       // if we're going to bump into the side of the window, go to the edge less 10px.
//       if (toolbar_height + selection_dimensions.bottom > window.innerHeight) {
//         toolbar.style.top = window.innerHeight - (toolbar_height + 10) + "px";
//       } else {
//         toolbar.style.top = selection_dimensions.bottom + "px";
//       }

//       if (toolbar_width + selection_dimensions.right > window.innerWidth) {
//         toolbar.style.left = window.innerWidth - (toolbar_width + 10) + "px";
//       } else {
//         toolbar.style.left = selection_dimensions.right + 10 + "px";
//       }

//       toolbar.style.display = "block";
//       toolbar.style.opacity = 1;
//     }
//   });
// });

export default {
  name: "App",
  components: {},
  data: () => ({
    overlay: false,
    message: "",
    content: null,
    editorQuill: null,
    max: 10,
    editorSettings: {
      modules: {
        toolbar: toolbar,
        imageResize: {
          modules: ["Resize", "DisplaySize"],
        },
      },
    },
  }),
  watch: {
    content: function () {
      // this.max = 100;
      // if (!!this.max && this.editorQuill.getLength() >= this.max) {
      //   this.editorQuill.deleteText(this.max, this.editorQuill.getLength());
      // }
    },
  },
  mounted() {
    this.setDirection("rtl");
    //this.$refs.qlEditor.$el.style.backgroundImage="url(/img/logo.82b9c7a5.png)";
  },
  methods: {
    setDirection(strDirection) {
      if (strDirection == "rtl") {
        this.$refs.qlEditor.quill.format("direction", "rtl");
        this.$refs.qlEditor.quill.format("align", "right");
      } else {
        this.$refs.qlEditor.quill.format("direction", "ltr");
        this.$refs.qlEditor.quill.format("align", "left");
      }
    },
    saveToFile() {
      this.overlay = true;
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      };
      axios
        .post(
          "http://localhost:3080/api/sendemail",
          { email: this.content },
          { headers }
        )
        .then((response) => {
          if (response.data != "success") {
            this.overlay = false;
            console.log("error");
          } else {
            this.overlay = false;
            this.message = "Email sent successfully";
            setTimeout(() => {
              this.message = "";
            }, 3000);
          }
        })
        .catch((error) => {
          this.overlay = false;
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
