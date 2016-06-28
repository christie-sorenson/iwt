# `flex`

To turn a container into a flexbox container, give it the display value `display: flex;`

<div style="display:flex;"></div>

By default, child elements will be displayed in a non-wrapping row and stretched to fit vertically.


<div class="box flex flex-grow-1 resize">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <div class="col">Col 3</div>
</div>

---

    <div style="display:flex">
        <div>Col 1</div>
        <div>Col 2</div>
        <div>Col 3</div>
    </div>