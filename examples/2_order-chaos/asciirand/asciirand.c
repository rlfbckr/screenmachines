#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
   setbuf(stdout, NULL);
    while (1) {
        int r = rand() % 4;
        if (r == 0) {
            putchar('*');
        } else if (r == 1) {
            putchar(' ');
        } else if (r == 2) {
            putchar('-');
        } else {
            putchar('|');
        }
        usleep(100);
    }
    return 0;
}