<template>
  <ul class="semantic-elements">
    <div class="semantic-elements__header">
      <label class="semantic-elements__header-label">Theme Styles</label>
      <span class="semantic-elements__header-title">HTML Elements</span>
      <p>
        Semantic elements are used to define <b>default</b> styles for HTML elements as they are
        defined in the
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">
          HTML elements reference (developer.mozilla.org)
      </a>.
      </p>
    </div>


    <label class="semantic-elements__section-label">Content sectioning</label>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;address&#62;</code>
      <address>
        <a href="mailto:jim@rock.com">tommy@twotone.com</a><br/>
        <a href="tel:+311-555-2368">202-867-5309</a><br/>
      </address>
    </li>
    <!-- <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;article&#62;</code>
      <span class="semantic-elements__element-description">No presentation styles.</span>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;aside&#62;</code>
      <span class="semantic-elements__element-description">No presentation styles.</span>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;footer&#62;</code>
      <span class="semantic-elements__element-description">No presentation styles.</span>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;header&#62;</code>
      <span class="semantic-elements__element-description">No presentation styles.</span>
    </li> -->
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;h1&#62;</code>
      <h1>Jived fox nymph grabs quick waltz.</h1>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;h2&#62;</code>
      <h2>Glib jocks quiz nymph to vex dwarf.</h2>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;h3&#62;</code>
      <h3>Sphinx of black quartz, judge my vow.</h3>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;h4&#62;</code>
      <h4>How vexingly quick daft zebras jump!</h4>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;h5&#62;</code>
      <h5>The five boxing wizards jump quickly.</h5>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;h6&#62;</code>
      <h6>Pack my box with five dozen liquor jugs.</h6>
    </li>
    <label class="semantic-elements__section-label">Text Content</label>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;li&#62;</code>
      <ul>
        <li>Harry Potter and the Prizoner of Azkaban</li>
        <li>Harry Potter and the Chamber of Secrets</li>
        <li>Harry Potter and the Half Blood Prince</li>
      </ul>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;ol&#62;</code>
      <ol>
        <li>Gummy Worms</li>
        <li>Gummy Bears</li>
        <li>Gummy Cola</li>
      </ol>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;p&#62;</code>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupida
        tat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;ul&#62;</code>
      <ul>
        <li>Gummy Worms</li>
        <li>Gummy Bears</li>
        <li>Gummy Cola</li>
      </ul>
    </li>
    <label class="semantic-elements__section-label">Inline Text Semantics</label>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;a&#62;</code>
      <a>google.com</a>
      <code class="semantic-elements__element-name">&#60;a href&#62;</code>
      <a href="google.com">google.com</a>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;abbr&#62;</code>
      <abbr>SCUBA</abbr>
      <code class="semantic-elements__element-name">&#60;abbr title&#62;</code>
      <abbr title="Self Contained Underwater Breathing Apparatus">SCUBA</abbr>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;b&#62;</code>
      <p>Pack my box with <b>five dozen</b> liquor jugs.</p>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;code&#62;</code>
      <code>console.log("😳")</code>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;label&#62;</code>
      <label>Favorite Candy</label>
    </li>
    <li class="semantic-elements__element-container">
      <code class="semantic-elements__element-name">&#60;span&#62;</code>
      <span>Span: Span style</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SemanticElements',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@at-root {
  .semantic-elements {
    @extend .layout-main-container;
    @extend .material-box-shadow--level-2;
    background-color: $solitude;
    border-radius: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    &__header {
      display: flex;
      flex-direction: column;
    }
    &__header-label {
      color: $danube;
    }
    &__header-title {
      color: $dark-cerulean;
    }
    &__section-label {
      color: $regal-blue;
      margin-top: 1rem;
      display: block;
    }
    &__element-container {
      background-color: #FFFFFF;
      border-radius: 0.5rem;
      margin: 0.5rem 0;
      overflow: hidden;
      padding-bottom: 1.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
      white-space: nowrap;
    }
    &__element-name {
      color: $fuchsia;
      display: block;
      margin-bottom: 0.4rem;
      margin-top: 0.6rem;
    }
    &__element-description {
      color: $cello;
      font-size: 1rem;
      font-style: italic;
    }
  }
}
</style>
