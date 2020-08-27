export default function convertHourToMinutes(time: string) { 
  // função responsável por converter horas em minutos para o bd, informamos que o parâmetro que ela recebe é do tipo string
  // recebemos as horas, exemplo 8:00, fazemos o split de ':', ou seja, removemos os dois pontos, isso gerará o array ['8', '00']
  // por meio da desestruturação de array, geramos as variáveis hour e minutes, primeiro e segundo índice do array, respectivamente
  // então realizamos o map no array convertendo as strings em numbers
  // por fim, a variável timeInMinutes recebe hour x 60 para converter horas em minutos e somamos a esse valor os minutos
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;
  return timeInMinutes;
}