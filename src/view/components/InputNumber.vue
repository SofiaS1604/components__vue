<template>
    <div class="number">
        <div class="input__container">
            <input class="input__number"
                   type="text"
                   :id="id"
                   :name="name"
                   :placeholder="placeholder"
                   :readonly="readonly"
                   :disabled="disabled"
                   :value="currentValue"
                   @keydown.delete="currentValue = currentValue.slice(0, -1)"
                   @keydown.up="stepChange(stepAmount)"
                   @keydown.down="stepChange(-stepAmount)"
                   @input="handleKeyPress"/>

            <div class="input__arrows">
                <div class="input__arrow input__arrow--up" @click="stepChange(stepAmount)">
                    <img src="https://img.icons8.com/plasticine/50/000000/collapse-arrow.png"/>
                </div>
                <div class="input__arrow input__arrow--down" @click="stepChange(-stepAmount)"
                     style="transform: rotate(180deg)">
                    <img src="https://img.icons8.com/plasticine/50/000000/collapse-arrow.png"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputNumber',
        props: [
            'id',
            'name',
            'type',
            'placeholder',
            'step',
            'min',
            'max',
            'readonly',
            'disabled',
            'value'
        ],
        data() {
            return {
                maxAmount: this.max ? parseInt(this.max) : 100,
                stepAmount: this.step ? parseInt(this.step) : 1,
                minAmount: this.min ? parseInt(this.min) : 0,
                stepMin: !!(this.min && this.step),
                val: this.value ? this.value : '0',
                currentValue: this.value,
            };
        },
        watch: {
            val(val) {
                this.valueInput(val)
            }
        },
        methods: {
            handleKeyPress(e) {
                const allowedChars = new RegExp('^[a-z0-9]+$');
                const match = allowedChars.test(e.data);
                this.val = !!match ? this.currentValue + e.data : this.currentValue + '';
            },

            stepChange(diff) {
                this.val = parseInt(this.val);
                if (this.val <= this.maxAmount && this.val >= this.minAmount)
                    this.val += this.stepMin ? diff - this.val % this.minAmount % diff : diff;

                if (this.val > this.maxAmount) {
                    this.val = this.maxAmount;
                } else if (this.val < this.minAmount) {
                    this.val = this.minAmount;
                }

                this.$forceUpdate();
            },

            valueInput(val) {
                val += '';
                let reg = new RegExp('^[a-z]+$');
                if (!!reg.test(val[val.length - 1]))
                    val = val.slice(0, -1);

                this.currentValue = val;
                this.val = this.currentValue;
                this.$forceUpdate()
            }
        },
    };
</script>
