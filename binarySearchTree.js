/* eslint-disable require-jsdoc */
"use strict";

// eslint-disable-next-line no-redeclare
class Node {
    constructor(value, comparator = (a, b) => a - b) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.comparator = comparator;
    }
    min() {
        if (this.left !== null) {
            return this.left.min();
        }
        else {
            return this.value;
        }
    } // end of min method
    max() {
        if (this.right !== null) {
            return this.right.max();
        }
        else {
            return this.value;
        }
    } // end of max method
    add(element) {
        // if (element > this.value) {
        if (this.comparator(element,this.value)>0){
            if (this.right === null) {
                this.right = new Node(element,this.comparator);
            }
            else {
                this.right.add(element);
            }
        }
        else {
            if (this.left === null) {
                this.left = new Node(element,this.comparator);
            }
            else {
                this.left.add(element);
            }
        }
    }
    contains(element) {
        // if (element === this.value) {
        if (this.comparator(element,this.value)==0){
            return true;
        }
        // if (element > this.value) {
        if (this.comparator(element, this.value) > 0) {
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.contains(element);
            }
        }
        else {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.contains(element);
            }
        }
    }
    remove(parent, element) {
        // if (element < this.value) {
        if (this.comparator(element, this.value) < 0) {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.remove(this, element);
            }
        }
        // else if (element > this.value) {
        if (this.comparator(element, this.value) > 0) {
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.remove(this, element);
            }
        }
        else { //if (element === this.value) {
            // simply remove this node if it doesn't have children 
            if (this.left === null && this.right === null) {
                if (parent.left === this) {
                    parent.left = null;
                }
                else if (parent.right === this) {
                    parent.right = null;
                }
            }
            // if there is one child, put it in our place
            else if (this.left !== null && this.right === null) {
                this.value = this.left.value;
                this.right = this.left.right;
                this.left = this.left.left;
                return true;
            } else if (this.right !== null && this.left === null) {
                this.value = this.right.value;
                this.left = this.right.left;
                this.right = this.right.right;
                return true;
            } else if (this.left !== null && this.right !== null) {
               
                let largest = this.left.max();
                this.value = largest;
                this.left.remove(this, largest);
            }
            return true;
        } 
    } 
    makeInOrderArray(){
        let output = [];
        let left = [];
        let right = [];
        if (this.left){ 
            left = this.left.makeInOrderArray();
        }
        if (this.right){
            right = this.right.makeInOrderArray();
        }
        output = [...left, this.value, ...right];
        return output;
    }
} 

class RootNode extends Node {
    constructor(comparator) {
        super(null,comparator);
    }
    add(element) {
        if (this.value === null) {
            this.value = element;
            return;
        }
        return super.add(element);
    }
    remove(element) {
        // if (this.value === element && this.left === null && this.right === null) {
        //     this.value = null;
        //     return true;
        // }
        if( this.comparator(this.value,element)==0 && this.left === null && this.right === null){
            this.value = null;
            return true;
        }
        else {
            return super.remove(this, element);
        }
    }
}

// eslint-disable-next-line no-unused-vars
class BinarySearchTree {
    constructor(comparator = (a,b)=>a-b) {
        this.comparator = comparator;
        this.root = new RootNode(this.comparator);
    }
    add(element) {
        this.root.add(element,this.comparator);
    }
    contains(element) {
        return this.root.contains(element);
    }
    remove(element) {
        return this.root.remove(element);
    }
    min() {
        return this.root.min();
    }

    /**
     * takes an array of values and inserts all of them into the BST
     * 
     * @param {Array} array
     * @memberof BinarySearchTree
     */
    insertAll(array){
        for (let i=0;i<array.length;i++){
            this.add(array[i]);
        }
    } 
    /**
     
     * @returns {Array} array containing all the values currently in the BST
     * @memberof BinarySearchTree
     */
    readIntoArray(){
        return this.root.makeInOrderArray();
    }
}