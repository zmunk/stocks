from django.http import JsonResponse
from datetime import timezone
from .models import Stock

def get_stocks(request, symbol, start, end):
    """
    symbol: stock symbol
    start: start date
    end: end date
    """
    stocks = Stock.objects.filter(symbol=symbol, date__range=[start.replace(tzinfo=timezone.utc), end.replace(tzinfo=timezone.utc)]).values()
    return JsonResponse(list(stocks), safe=False)

def get_symbols(request):
    """
    return list of symbols
    """
    symbols = list(Stock.objects.values('symbol').distinct())
    return JsonResponse(symbols, safe=False)

