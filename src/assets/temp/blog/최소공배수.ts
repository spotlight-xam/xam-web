export default {
  title: "최소공배수",
  text: `
\`\`\`c
	#include <stdio.h>
	int main(){
	int num1, num2, temp;

	printf("두 정수를 입력하시오:");
	scanf("%d %d", &num1, &num2);

for(int i = num1 * num2; i >= 1; i--) // 두 정수의 가장 큰 공배수 만큼 i 증가
	if(i % num1 == 0 && i % num2 == 0)
			temp = i;	// 두 정수의 공배수를 temp에 입력

	printf("최소공배수: %d\t", temp);		//최종 적으로 가장 작은 공배수가 출력
	return 0;
	}
\`\`\`
	`,
  contents: `
\`\`\`c
	#include <stdio.h>
	int main(){
	int num1, num2, temp;

	printf("두 정수를 입력하시오:");
	scanf("%d %d", &num1, &num2);

for(int i = num1 * num2; i >= 1; i--) // 두 정수의 가장 큰 공배수 만큼 i 증가
	if(i % num1 == 0 && i % num2 == 0)
			temp = i;	// 두 정수의 공배수를 temp에 입력

	printf("최소공배수: %d\t", temp);		//최종 적으로 가장 작은 공배수가 출력
	return 0;
	}
\`\`\`
	`,
  summary: `#include int main(){ int num1, num2, temp; printf("두 정수를 입력하시오:"); scanf("%d %d", &num1, &num2); for(int i = num1 * num2; i >= 1; i--) // 두 정수의 가장 큰 공배수 만큼 i 증가 if(i % num1 == 0 && i % num2 == 0) temp = i;// 두 정수의 공배수를 temp에 입력 printf("최소공배수: %d\t", temp);//최종 적으로 가장 작은 공배수가 출력 return 0; }`,
  createdAt: "2023. 3. 23. 22:01",
};
