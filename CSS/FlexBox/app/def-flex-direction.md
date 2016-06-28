# `flex-direction`

`flex-direction` controls whether the child elements are aligned **horizontally** in a row or **vertically** in a column.

The default flex direction is `row` and may be omitted if the desired orientation.

## Options

    column
    column-reverse
    row
    row-reverse

Example: `flex-direction: column;`

---

### Row

<div class="box flex flex-row resize">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <div class="col">Col 3</div>
</div>


    <div style="display:flex">
        <div>Col 1</div>
        <div>Col 2</div>
        <div>Col 3</div>
    </div>
    
---

### Row ( Reverse )

<div class="box flex flex-row-reverse resize">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <div class="col">Col 3</div>
</div>

    <div style="flex-direction:row-reverse;">
        <div>Col 1</div>
        <div>Col 2</div>
        <div>Col 3</div>
    </div>
    
---

### Column

<div class="box flex flex-column resize" style="min-height:200px;">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <span class="col">Col 3</span>
</div>

    <div style="flex-direction:column;">
        <div>Col 1</div>
        <div>Col 2</div>
        <span>Col 3</span>
    </div>
    

<div class="note">
    <a class="fa fa-info-circle"></a>
    <span>Column child elements automatically fill 100% width regardless if they are an inline or block element.</span>
</div>
    
---

### Column ( Reverse )

<div class="box flex flex-column-reverse resize" style="min-height:200px;">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <span class="col">Col 3</span>
</div>

    <div style="flex-direction:column-reverse;">
        <div>Col 1</div>
        <div>Col 2</div>
        <span>Col 3</span>
    </div>