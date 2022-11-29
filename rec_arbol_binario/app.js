class Nodo {
  constructor(numero) {
    this.numero = numero;
    this.izquierda = null;
    this.derecha = null;
  }
}

//GUARDAR ESTO PARA MÁS TARDE.

// //preorder(nodox) {
//   if (nodox != null) {
//     this.preorderArr.push(nodox.valor);
//     this.preorder(nodox.hijoIzq);
//     this.preorder(nodox.hijoDer);
// } 

// if (this.preorderArr[this.preorderArr.length - 1] == undefined) {
//     this.preorderArr.pop();
// }

// return this.preorderArr;
// }

class Arbol {
  constructor() {
    this.raiz = null;
    this.primero = null;
    this.ultimo = null;
    this.expresion = expresion;
    this.lifo = [];
    this.fifo = [];
  }

  dividirExprecion() {
    let dividir = this.expresion.split('');

    for (let i = 0; i < dividir.length; i++) {
        this.agregarNodo(dividir[i]);
    }
    return this.crearArbol();
}

agregarNodo(nodo) {
    let nodox = new Nodo(nodo);

    if (this.primero == null) {
        this.primero = nodox;
        this.ultimo = nodox;
    } else {
        this.ultimo.siguiente = nodox;
        nodox.anterior = this.ultimo;
        this.ultimo = nodox;
    }
}

borrarNodo(nodox) {
    if (nodox != this.primero) {
        nodox.anterior.siguiente = nodox.siguiente;
        if (nodox.siguiente != null) {
            nodox.siguiente.anterior = nodox.anterior;
        } else {
            this.ultimo = nodox.anterior;
        }
    } else {
        if (this.primero == this.ultimo) {
            this.primero = null;
            this.ultimo = null;
        } else {
            this.primero = this.primero.siguiente;
            this.primero.anterior = null;
        }
    }
}

crearArbol() {
    let aux = this.primero;
    while  (aux != null) {
        if (aux.valor == '*' || aux.valor == '/') {
            aux.hijoIzq = aux.anterior;
            aux.hijoDer = aux.siguiente;
            this.borrarNodo(aux.anterior);
            this.borrarNodo(aux.siguiente);
        }
        aux = aux.siguiente;
    }
    aux = this.primero;
    while  (aux != null) {
        if (aux.valor == '+' || aux.valor == '-') {
            aux.hijoIzq = aux.anterior;
            aux.hijoDer = aux.siguiente;
            this.borrarNodo(aux.anterior);
            this.borrarNodo(aux.siguiente);
        }
        aux = aux.siguiente;
    }
    this.raiz = this.primero;

    return this.raiz;
}

// for (let i = 0; i < expresion.length; i++) {
//   if (expresion[i].match(numero)) {
//     let nodo = new Nodo(parseInt(expresion[i]));
//     console.log(i + ' ' + expresion[i]);
//     arbol.agregar(nodo);
//   }

  _agregarRec(nuevo, nodox) {
    if (nuevo.numero < nodox.numero) {
      if (nodox.izquierda == null) {
        nodox.izquierda = nuevo;
      } else {
        this._agregarRec(nuevo, nodox.izquierda);
      }
    } else {
      if (nodox.derecha == null) {
        nodox.derecha = nuevo;
      } else {
        this._agregarRec(nuevo, nodox.derecha);
      }
    }
  }


  posorder() {
    if (this.raiz == null) {
      return null;
    } else {
      this._posOrder(this.raiz);
    }
  }
  _posOrder(nodox) {
    if (nodox.izquierda != null)
      this._posOrder(nodox.izquierda);
    if (nodox.derecha)
      this._posOrder(nodox.derecha);
    console.log(nodox.numero);
    this.fifo.push(nodox.numero);
  }

  preorder() {
    if (this.raiz == null) {
      return null;
    } else {
      this._preOrder(this.raiz);
    }
  }
  _preOrder(nodox) {
    console.log(nodox.numero);
    this.lifo.push(nodox.numero);
    if (nodox.izquierda != null)
      this._preOrder(nodox.izquierda);
    if (nodox.derecha)
      this._preOrder(nodox.derecha);
  }
  inorder() {
    if (this.raiz == null) {
      return null;
    } else {
      this._inOrder(this.raiz);
    }
  }
  _inOrder(nodox) {
    if (nodox.izquierda != null)
      this._inOrder(nodox.izquierda);
    console.log(nodox.numero);
    if (nodox.derecha)
      this._inOrder(nodox.derecha);
  }

  sPreOrder() {
    let aux = [];
    let derecha = '';
    let izquierda = '';
    let operacion = '';
    let res = 0;
    //(this.lifo[i] == '*') || (this.lifo[i] == '/')
    for (let i = this.lifo.length - 1; i >= 0; i--) {
      if (this.lifo[i].match(/^[0-9]+$/)) {
        aux.push(this.lifo.pop());
      } else {
        izquierda = aux.pop();
        operacion = this.lifo[i];
        this.lifo.pop();
        derecha = aux.pop();
        if (operacion == '/') {
          res = parseInt(izquierda) / parseInt(derecha);
          aux.push(res);
        } else if (operacion == '*') {
          res = parseInt(izquierda) * parseInt(derecha);
          aux.push(res);
        } else if (operacion == '+') {
          res = parseInt(izquierda) + parseInt(derecha);
          aux.push(res);
        } else if (operacion == '-') {
          res = parseInt(izquierda) - parseInt(derecha);
          aux.push(res);
        }
      }
    }
    return aux;
  }

  sPosOrder() {
    let aux = [];
    let derecha = 0;
    let izquierda = 0;
    let operacion = '';
    let resultado = 0;

    for (let i = 0; i <= this.fifo.length - 1; i++) {
      if (this.fifo[0].match(/^[0-9]+$/)) {
        aux.push(this.fifo[0]);
        for (let j = 0; j <= this.fifo.length - 1; j++) {
          this.fifo[j] = this.fifo[j + 1];
        }
        this.fifo[this.fifo.length - 1] = null;
      } else {
        derecha = aux.pop();
        operacion = this.fifo[0];
        for (let k = 0; k <= this.fifo.length - 1; k++) {
          this.fifo[k] = this.fifo[k + 1];
        }
        this.fifo[this.fifo.length - 1] = null;
        izquierda = aux.pop();

        if (operacion == '/') {
          derecha = parseInt(izquierda) / parseInt(derecha);
          aux.push(derecha);
        }

        if (operacion == '*') {
          derecha = parseInt(izquierda) * parseInt(derecha);
          aux.push(derecha);
        }

        if (operacion == '+') {
          derecha = parseInt(izquierda) + parseInt(derecha);
          aux.push(derecha);
        }

        if (operacion == '-') {
          derecha = parseInt(izquierda) - parseInt(derecha);
          aux.push(derecha);
        }

      }
    }
    return derecha;
  }

}

const arbol = new Arbol();

// console.log(arbol.sPosOrder('432*+6-9+36*9/+'));
// console.log(arbol.sPosOrder('39*63*2/-36*+54*2/+'));