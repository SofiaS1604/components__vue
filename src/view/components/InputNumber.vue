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
                    :value="this.amount"
                    @keydown="handleKeyPress"/>

            <div class="input__arrows">
                <div class="input__arrow input__arrow--up" @click="stepChange(stepAmount)">
                    <img src="https://img.icons8.com/plasticine/50/000000/collapse-arrow.png"/>
                </div>
                <div class="input__arrow input__arrow--down" @click="stepChange(-stepAmount)" style="transform: rotate(180deg)">
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
            'value',
            'id',
            'name',
            'type',
            'placeholder',
            'step',
            'min',
            'max',
            'readonly',
            'disabled',
        ],
        data() {
            return {
                maxAmount: this.max ? parseInt(this.max) : 100,
                amount: 0,
                stepAmount: this.step ? parseInt(this.step) : 1,
                minAmount: this.min ? parseInt(this.min) : 0,
                stepMin: !!(this.min && this.step),
                val: ''
            };
        },
        watch: {
            amount(value) {
                this.$emit('input', value);
            },
            value(value) {
                this.amount = value;
            },
        },
        methods: {
            handleKeyPress(e) {
                const allowedChars = new RegExp('^[0-9]+$');
                const keyCode = e.keyCode || e.which;
                const match = e.key.match(allowedChars);

                keyCode === 38 ? this.stepChange(this.stepAmount) : null;
                keyCode === 40 ? this.stepChange(-this.stepAmount) : null;

                if (!match && e.keyCode !== 8)
                    e.preventDefault();

                this.val += match ? match.input : '';
                this.val = e.keyCode === 8 ? this.val.slice(0, -1) : this.val;
                return !!match;
            },
            stepChange(diff) {
                this.amount = parseInt(this.val);

                if(this.amount <= this.maxAmount && this.amount >= this.minAmount){
                    if(this.stepMin)
                        this.amount = parseInt(this.amount) + (diff - parseInt(this.amount) % this.minAmount % diff);
                    else
                        this.amount = parseInt(this.amount) + diff;
                }

                if (this.amount > this.maxAmount) {
                    this.amount = this.maxAmount;
                } else if (this.amount < this.minAmount) {
                    this.amount = this.minAmount;
                }

                this.val = this.amount;
                this.$forceUpdate();
            },
        },
        created() {
            this.amount = this.value;
        },
    };
</script>
