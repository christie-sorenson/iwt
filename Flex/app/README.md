# Flexbox

<blockquote>All You Need To Know</blockquote>

Last Modified: {{ file.mtime }}

---

The gray, child containers automatically adjust to fill the space. Try resizing the container.

<div class="flex flex-column" data-demo data-resize>
    <div class="bar">Not Flexed</div>
    <div class="flex flex-grow-1">
        <div class="col highlight flex-grow-1">Flexed Horizontally</div>
        <div class="col box-col">Not Flexed</div>
    </div>
    <div class="flex flex-grow-1">
        <div class="col box-col">Not Flexed</div>
        <div class="col highlight flex-grow-1">Flexed Horizontally</div>
        <div class="col box-col">Not Flexed</div>
    </div>
    <div class="bar resize">Not Flexed</div>
</div>

Try that with traditional methods!

For example, using `float` or `inline-block` to position the child columns' width percentages would be easy horizontally, but what about the vertical stretching?

With Flexbox, it handles all of this for you.